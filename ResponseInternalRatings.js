// package com.socgen.dbe.Model;

// import java.util.ArrayList;
// import java.util.List;

// public class ResponseInternalRatings {
//     private List<Sensitivity> sensitivityList = new ArrayList<>();

//     public List<Sensitivity> getSensitivityList() {
//         return sensitivityList;
//     }

//     public void setSensitivityList(List<Sensitivity> sensitivityList) {
//         this.sensitivityList = sensitivityList;
//     }

//     @Override
//     public String toString() {
//         return "ResponseInternalRatings{" +
//                "sensitivityList=" + sensitivityList +
//                '}';
//     }
// }



package com.socgen.dbe.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ResponseInternalRatings {
    @JsonProperty("sensitivityList")
    private List<Sensitivity> sensitivityList;

    public List<Sensitivity> getSensitivityList() {
        return sensitivityList;
    }

    public void setSensitivityList(List<Sensitivity> sensitivityList) {
        this.sensitivityList = sensitivityList;
    }

    @Override
    public String toString() {
        return "ResponseInternalRatings{" +
               "sensitivityList=" + sensitivityList +
               '}';
    }
}
