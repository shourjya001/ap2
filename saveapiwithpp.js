import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SaveInternalRatingApi {
    private static final int THREAD_POOL_SIZE = 4; // Adjust based on your system capabilities
    private static final int BATCH_SIZE = 1000;    // Adjust based on your requirements
    private static final int LOG_INTERVAL = 5000;  // Log progress every 5000 records
    private final AtomicInteger totalInserted = new AtomicInteger(0);
    private final JdbcTemplate jdbcTemplate;

    @Transactional
    public void saveInternalRatingApi(ResponseInternalRatings internalRatingsEventResponse) {
        log.info("Truncate TINTERNALRATINGSEVENTS started");
        // Truncate the table
        this.jdbcTemplate.update(AppQueries.QRY_INTERNALRATINGSEVENTS_TRUNCATE.value(), new Object[]{});
        
        try {
            List<Sensitivity> sensitivityList = internalRatingsEventResponse.getSensitivityList();
            int totalSize = sensitivityList.size();
            System.out.println("Total records to process: " + totalSize);
            
            if (totalSize > 0) {
                long startTime = System.currentTimeMillis();
                ExecutorService executorService = Executors.newFixedThreadPool(THREAD_POOL_SIZE);
                List<CompletableFuture<Void>> futures = new ArrayList<>();

                // Process data in batches using parallel streams
                for (int i = 0; i < totalSize; i += BATCH_SIZE) {
                    int end = Math.min(i + BATCH_SIZE, totalSize);
                    List<Sensitivity> batch = sensitivityList.subList(i, end);
                    
                    CompletableFuture<Void> future = CompletableFuture.runAsync(
                        () -> processBatch(batch), 
                        executorService
                    );
                    futures.add(future);
                }

                // Wait for all futures to complete
                CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
                executorService.shutdown();
                
                logProgress(totalInserted.get(), startTime);
            }
        } catch (Exception e) {
            log.error("Error in saving the response values of internal ratings event api into database table", e);
            throw e;
        }
    }

    private void processBatch(List<Sensitivity> batch) {
        try {
            int inserted = executeBatch(batch);
            int newTotal = totalInserted.addAndGet(inserted);
            if (newTotal % LOG_INTERVAL == 0) {
                logProgress(newTotal, System.currentTimeMillis());
            }
        } catch (Exception e) {
            log.error("Error processing batch", e);
            throw e;
        }
    }

    private int executeBatch(List<Sensitivity> batch) {
        int[] updateCounts = jdbcTemplate.batchUpdate(
            AppQueries.QRY_SAVE_INTERNALRATINGSEVENTS.value(),
            new BatchPreparedStatementSetter() {
                @Override
                public void setValues(PreparedStatement ps, int i) throws SQLException {
                    Sensitivity sensitivity = batch.get(i);
                    ps.setString(1, sensitivity.getBdrId());
                    ps.setString(2, sensitivity.getSensitivityRank());
                    ps.setString(3, sensitivity.getSensitivityRankName());
                    ps.setString(4, sensitivity.getCellRiskId());
                    ps.setString(5, sensitivity.getCellRiskName());
                    ps.setString(6, sensitivity.getRatingSystemFacilityPurposeId());
                    ps.setString(7, sensitivity.getRatingSystemFacilityPurposeName());
                }

                @Override
                public int getBatchSize() {
                    return batch.size();
                }
            }
        );
        return Arrays.stream(updateCounts).sum();
    }

    private void logProgress(int totalInserted, long startTime) {
        long currentTime = System.currentTimeMillis();
        long elapsedSeconds = (currentTime - startTime) / 1000;
        double recordsPerSecond = totalInserted / (double) Math.max(1, elapsedSeconds);
        log.info("Inserted {} records. Rate: {:.2f} records/second", 
                totalInserted, recordsPerSecond);
    }
}
