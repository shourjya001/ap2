import java.util.List;

public void saveInternalRatingApi(ResponseInternalRatings internalRatingsEventResponse) {
    log.info("Truncate TINTERNALRATINGSEVENTS started");

    // Truncate the table
    this.jdbcTemplate.update(AppQueries.QRY_INTERNALRATINGSEVENTS_TRUNCATE.value(), new Object[]{});

    try {
        System.out.println("size=" + internalRatingsEventResponse.getSensitivityList().size());

        log.info("Saving the response values of internal ratings event api into database table started");

        List<Sensitivity> sensitivityList = internalRatingsEventResponse.getSensitivityList();

        if (!sensitivityList.isEmpty()) {
            for (Sensitivity sensitivity : sensitivityList) {
                this.jdbcTemplate.update(AppQueries.QRY_SAVE_INTERNALRATINGSEVENTS.value(), new Object[]{
                    sensitivity.getBdrId(),
                    sensitivity.getSensitivityRank(),
                    sensitivity.getSensitivityRankName(),
                    sensitivity.getCellRiskId(),
                    sensitivity.getCellRiskName(),
                    sensitivity.getRatingSystemFacilityPurposeId(),
                    sensitivity.getRatingSystemFacilityPurposeName()
                });
            }
        }
    } catch (NullPointerException e) {
        log.info("Error in saving the response values of internal ratings event api into database table");
        log.info("Error Message:" + e.getMessage());
        System.out.println("Exception thrown : " + e);
    }
}
