import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.zip.GZIPInputStream;

public ResponseInternalRatings sendInternalRatingsApi() throws IOException, JsonProcessingException {
    String scope = "api.get-third-parties.v1";
    String access_token = generateSGconnectToken(scope);
    ResponseInternalRatings responseObject = null;

    String senstivitydate = "?snapshotDate=2024-11-14";

    System.out.println("sending Data To Api*");

    RestTemplate restTemplate = new RestTemplate();
    HttpHeaders headers = new HttpHeaders();

    headers.set("Authorization", "Bearer " + access_token);
    headers.set("content-Language", "en-US");
    headers.set("Accept", "application/json");
    headers.set("content-type", "application/json");
    headers.set("Accept-Encoding", "gzip, deflate");

    HttpEntity<String> entity = new HttpEntity<>("", headers);

    System.out.println("requestObject---->" + headers);

    ResponseEntity<String> result = restTemplate.exchange(
        this.dbeclientProperties.getMaestrosensitivityApiUrl() + senstivitydate,
        HttpMethod.GET,
        entity,
        String.class,
        new Object[0]
    );

    byte[] compressedBytes = result.getBody().getBytes(StandardCharsets.ISO_8859_1);
    String decompressedJson = null;

    try (GZIPInputStream gzipInputStream = new GZIPInputStream(new ByteArrayInputStream(compressedBytes));
         InputStreamReader reader = new InputStreamReader(gzipInputStream, StandardCharsets.UTF_8)) {

        decompressedJson = IOUtils.toString(reader);

    } catch (IOException e) {
        System.err.println("Error decompressing GZIP content: " + e.getMessage());
        e.printStackTrace();
        return null;
    }

    System.out.println(decompressedJson);
    System.out.println(decompressedJson.length());

    System.out.println("*Successfully Data received from Nova api******");

    int status = result.getStatusCode().value();

    if (status == 200) {
    ObjectMapper mapperObj = new ObjectMapper();
    try {
        // First deserialize to List<Sensitivity>
        List<Sensitivity> sensitivities = mapperObj.readValue(
            decompressedJson, 
            new TypeReference<List<Sensitivity>>() {}
        );
        
        // Create ResponseInternalRatings and set the list
        responseObject = new ResponseInternalRatings();
        responseObject.setSensitivityList(sensitivities);
        
        System.out.println("responseObject---->" + responseObject);
    } catch (Exception e) {
        System.err.println("Error deserializing response: " + e.getMessage());
        e.printStackTrace();
    }
    }
    return responseObject;
}
