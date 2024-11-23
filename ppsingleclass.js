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
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;

public class SaveInternalRatingApi {
    private final JdbcTemplate jdbcTemplate;
    
    public SaveInternalRatingApi(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Transactional
    public void saveInternalRatingApi(ResponseInternalRatings internalRatingsEventResponse) {
        System.out.println("Truncate TINTERNALRATINGSEVENTS started");
        this.jdbcTemplate.update(AppQueries.QRY_INTERNALRATINGSEVENTS_TRUNCATE.value(), new Object[]{});
        
        try {
            List<Sensitivity> sensitivityList = internalRatingsEventResponse.getSensitivityList();
            int totalSize = sensitivityList.size();
            System.out.println("Total records to process: " + totalSize);
            
            if (totalSize > 0) {
                final int THREAD_POOL_SIZE = 4;
                final int BATCH_SIZE = 1000;
                final AtomicInteger totalInserted = new AtomicInteger(0);
                long startTime = System.currentTimeMillis();
                
                ExecutorService executorService = Executors.newFixedThreadPool(THREAD_POOL_SIZE);
                List<CompletableFuture<Void>> futures = new ArrayList<>();

                // Process data in batches
                for (int i = 0; i < totalSize; i += BATCH_SIZE) {
                    int end = Math.min(i + BATCH_SIZE, totalSize);
                    List<Sensitivity> batch = sensitivityList.subList(i, end);
                    
                    CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
                        try {
                            // Execute batch update
                            int[] updateCounts = jdbcTemplate.batchUpdate(
                                AppQueries.QRY_SAVE_INTERNALRATINGSEVENTS.value(),
                                new BatchPreparedStatementSetter() {
                                    @Override
                                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                                        Sensitivity sensitivity = batch.get(i);
                                        ps.setString(1, sensitivity.getBdrId());
                                        
                                        ps.setString(4, sensitivity.getCellRiskId());
                                        ps.setString(5, sensitivity.getCellRiskName());
                                        ps.setString(2, sensitivity.getSensitivityRank());
                                        ps.setString(3, sensitivity.getSensitivityRankName());
                                        ps.setString(6, sensitivity.getRatingSystemFacilityPurposeId());
                                        ps.setString(7, sensitivity.getRatingSystemFacilityPurposeName());
                                    }

                                    @Override
                                    public int getBatchSize() {
                                        return batch.size();
                                    }
                                }
                            );
                            
                            // Update total and log progress
                            int inserted = Arrays.stream(updateCounts).sum();
                            int newTotal = totalInserted.addAndGet(inserted);
                            
                            // Log progress every 5000 records
                            if (newTotal % 5000 == 0) {
                                long currentTime = System.currentTimeMillis();
                                long elapsedSeconds = (currentTime - startTime) / 1000;
                                double recordsPerSecond = newTotal / (double) Math.max(1, elapsedSeconds);
                                System.out.println("Inserted " + newTotal + " records. Rate: " + 
                                    String.format("%.2f", recordsPerSecond) + " records/second");
                            }
                            
                        } catch (Exception e) {
                            System.out.println("Error processing batch: " + e.getMessage());
                            throw new RuntimeException(e);
                        }
                    }, executorService);
                    
                    futures.add(future);
                }

                // Wait for all futures to complete
                CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
                executorService.shutdown();
                
                // Log final statistics
                long endTime = System.currentTimeMillis();
                long totalSeconds = (endTime - startTime) / 1000;
                double finalRate = totalInserted.get() / (double) Math.max(1, totalSeconds);
                System.out.println("Final total: " + totalInserted.get() + " records inserted. " +
                    "Average rate: " + String.format("%.2f", finalRate) + " records/second");
            }
            
        } catch (Exception e) {
            System.out.println("Error in saving the response values of internal ratings event api into database table: " + e.getMessage());
            throw e;
        }
    }
}
