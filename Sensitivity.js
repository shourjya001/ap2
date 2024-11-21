package com.socgen.dbe.Model;

public class Sensitivity {
    private String bdrId;
    private String cellRiskId;
    private String cellRiskName;
    private String sensitivityRank;
    private String sensitivityRankName;
    private String ratingSystemFacilityPurposeId;
    private String ratingSystemFacilityPurposeName;

    // Getters and Setters
    public String getBdrId() {
        return bdrId;
    }

    public void setBdrId(String bdrId) {
        this.bdrId = bdrId;
    }

    public String getCellRiskId() {
        return cellRiskId;
    }

    public void setCellRiskId(String cellRiskId) {
        this.cellRiskId = cellRiskId;
    }

    public String getCellRiskName() {
        return cellRiskName;
    }

    public void setCellRiskName(String cellRiskName) {
        this.cellRiskName = cellRiskName;
    }

    public String getSensitivityRank() {
        return sensitivityRank;
    }

    public void setSensitivityRank(String sensitivityRank) {
        this.sensitivityRank = sensitivityRank;
    }

    public String getSensitivityRankName() {
        return sensitivityRankName;
    }

    public void setSensitivityRankName(String sensitivityRankName) {
        this.sensitivityRankName = sensitivityRankName;
    }

    public String getRatingSystemFacilityPurposeId() {
        return ratingSystemFacilityPurposeId;
    }

    public void setRatingSystemFacilityPurposeId(String ratingSystemFacilityPurposeId) {
        this.ratingSystemFacilityPurposeId = ratingSystemFacilityPurposeId;
    }

    public String getRatingSystemFacilityPurposeName() {
        return ratingSystemFacilityPurposeName;
    }

    public void setRatingSystemFacilityPurposeName(String ratingSystemFacilityPurposeName) {
        this.ratingSystemFacilityPurposeName = ratingSystemFacilityPurposeName;
    }

    @Override
    public String toString() {
        return "Sensitivity{" +
               "bdrId='" + bdrId + '\'' +
               ", cellRiskId='" + cellRiskId + '\'' +
               ", cellRiskName='" + cellRiskName + '\'' +
               ", sensitivityRank='" + sensitivityRank + '\'' +
               ", sensitivityRankName='" + sensitivityRankName + '\'' +
               ", ratingSystemFacilityPurposeId='" + ratingSystemFacilityPurposeId + '\'' +
               ", ratingSystemFacilityPurposeName='" + ratingSystemFacilityPurposeName + '\'' +
               '}';
    }
}
