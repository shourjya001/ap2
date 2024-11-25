// package com.socgen.dbe.Model;

// public class Sensitivity {
//     private String bdrId;
//     private String cellRiskId;
//     private String cellRiskName;
//     private String sensitivityRank;
//     private String sensitivityRankName;
//     private String ratingSystemFacilityPurposeId;
//     private String ratingSystemFacilityPurposeName;

//     // Getters and Setters
//     public String getBdrId() {
//         return bdrId;
//     }

//     public void setBdrId(String bdrId) {
//         this.bdrId = bdrId;
//     }

//     public String getCellRiskId() {
//         return cellRiskId;
//     }

//     public void setCellRiskId(String cellRiskId) {
//         this.cellRiskId = cellRiskId;
//     }

//     public String getCellRiskName() {
//         return cellRiskName;
//     }

//     public void setCellRiskName(String cellRiskName) {
//         this.cellRiskName = cellRiskName;
//     }

//     public String getSensitivityRank() {
//         return sensitivityRank;
//     }

//     public void setSensitivityRank(String sensitivityRank) {
//         this.sensitivityRank = sensitivityRank;
//     }

//     public String getSensitivityRankName() {
//         return sensitivityRankName;
//     }

//     public void setSensitivityRankName(String sensitivityRankName) {
//         this.sensitivityRankName = sensitivityRankName;
//     }

//     public String getRatingSystemFacilityPurposeId() {
//         return ratingSystemFacilityPurposeId;
//     }

//     public void setRatingSystemFacilityPurposeId(String ratingSystemFacilityPurposeId) {
//         this.ratingSystemFacilityPurposeId = ratingSystemFacilityPurposeId;
//     }

//     public String getRatingSystemFacilityPurposeName() {
//         return ratingSystemFacilityPurposeName;
//     }

//     public void setRatingSystemFacilityPurposeName(String ratingSystemFacilityPurposeName) {
//         this.ratingSystemFacilityPurposeName = ratingSystemFacilityPurposeName;
//     }

//     @Override
//     public String toString() {
//         return "Sensitivity{" +
//                "bdrId='" + bdrId + '\'' +
//                ", cellRiskId='" + cellRiskId + '\'' +
//                ", cellRiskName='" + cellRiskName + '\'' +
//                ", sensitivityRank='" + sensitivityRank + '\'' +
//                ", sensitivityRankName='" + sensitivityRankName + '\'' +
//                ", ratingSystemFacilityPurposeId='" + ratingSystemFacilityPurposeId + '\'' +
//                ", ratingSystemFacilityPurposeName='" + ratingSystemFacilityPurposeName + '\'' +
//                '}';
//     }
// }



package com.socgen.dbe.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Sensitivity {
    @JsonProperty("bdrId")
    private String bdrId;

    @JsonProperty("cellRiskId")
    private String cellRiskId;

    @JsonProperty("cellRiskName")
    private String cellRiskName;

    @JsonProperty("sensitivityRank")
    private String sensitivityRank;

    @JsonProperty("sensitivityRankName")
    private String sensitivityRankName;

    @JsonProperty("ratingSystemFacilityPurposeId")
    private String ratingSystemFacilityPurposeId;

    @JsonProperty("ratingSystemFacilityPurposeName")
    private String ratingSystemFacilityPurposeName;

    // Default constructor
    public Sensitivity() {}

    // Getters
    public String getBdrId() {
        return bdrId;
    }

    public String getCellRiskId() {
        return cellRiskId;
    }

    public String getCellRiskName() {
        return cellRiskName;
    }

    public String getSensitivityRank() {
        return sensitivityRank;
    }

    public String getSensitivityRankName() {
        return sensitivityRankName;
    }

    public String getRatingSystemFacilityPurposeId() {
        return ratingSystemFacilityPurposeId;
    }

    public String getRatingSystemFacilityPurposeName() {
        return ratingSystemFacilityPurposeName;
    }

    // Setters
    public void setBdrId(String bdrId) {
        this.bdrId = bdrId;
    }

    public void setCellRiskId(String cellRiskId) {
        this.cellRiskId = cellRiskId;
    }

    public void setCellRiskName(String cellRiskName) {
        this.cellRiskName = cellRiskName;
    }

    public void setSensitivityRank(String sensitivityRank) {
        this.sensitivityRank = sensitivityRank;
    }

    public void setSensitivityRankName(String sensitivityRankName) {
        this.sensitivityRankName = sensitivityRankName;
    }

    public void setRatingSystemFacilityPurposeId(String ratingSystemFacilityPurposeId) {
        this.ratingSystemFacilityPurposeId = ratingSystemFacilityPurposeId;
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
