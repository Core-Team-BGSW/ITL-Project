package com.api.Employee.Service;

import com.api.Employee.Model.*;
import org.apache.hc.client5.http.config.ConnectionConfig;
import org.apache.hc.client5.http.config.RequestConfig;
import org.apache.hc.client5.http.cookie.StandardCookieSpec;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.client5.http.impl.io.PoolingHttpClientConnectionManager;
import org.apache.hc.client5.http.impl.io.PoolingHttpClientConnectionManagerBuilder;
import org.apache.hc.client5.http.ssl.SSLConnectionSocketFactoryBuilder;
import org.apache.hc.core5.http.io.SocketConfig;
import org.apache.hc.core5.http.ssl.TLS;
import org.apache.hc.core5.pool.PoolConcurrencyPolicy;
import org.apache.hc.core5.pool.PoolReusePolicy;
import org.apache.hc.core5.ssl.SSLContexts;
import org.apache.hc.core5.ssl.TrustStrategy;
import org.apache.hc.core5.util.TimeValue;
import org.apache.hc.core5.util.Timeout;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;
import java.util.Objects;

@Service
public class UserService {
    @Value("${api.url1}")
    private String apiUrl1;

    @Value("${api.url2}")
    private String apiUrl2;
    private String departmentHead; // Declare at class level
    private final RestTemplate restTemplate;

    public UserService() throws Exception {
        this.restTemplate = getRestTemplateWithTrustStrategy();
    }

    // Method to create RestTemplate with custom HttpClient and SSL handling
    public RestTemplate getRestTemplateWithTrustStrategy() throws NoSuchAlgorithmException, KeyStoreException, KeyManagementException {

        TrustStrategy acceptingTrustStrategy = (X509Certificate[] chain, String authType) -> true;

        PoolingHttpClientConnectionManager connectionManager = PoolingHttpClientConnectionManagerBuilder.create()
                .setSSLSocketFactory(SSLConnectionSocketFactoryBuilder.create()
                        .setSslContext(SSLContexts.custom().loadTrustMaterial(null, acceptingTrustStrategy).build())
                        .setTlsVersions(TLS.V_1_3, TLS.V_1_2)
                        .build())
                .setDefaultSocketConfig(SocketConfig.custom()
                        .setSoTimeout(Timeout.ofSeconds(5))
                        .build())
                .setPoolConcurrencyPolicy(PoolConcurrencyPolicy.STRICT)
                .setConnPoolPolicy(PoolReusePolicy.LIFO)
                .setDefaultConnectionConfig(ConnectionConfig.custom()
                        .setTimeToLive(TimeValue.ofMinutes(1L))
                        .setConnectTimeout(Timeout.ofSeconds(5))
                        .build())
                .build();

        CloseableHttpClient client = HttpClients.custom()
                .setConnectionManager(connectionManager)
                .setDefaultRequestConfig(RequestConfig.custom()
                        .setResponseTimeout(Timeout.ofSeconds(5))
                        .setCookieSpec(StandardCookieSpec.STRICT)
                        .build())
                .build();

        HttpComponentsClientHttpRequestFactory httpComponentsClientHttpRequestFactory = new HttpComponentsClientHttpRequestFactory(client);

        return new RestTemplate(httpComponentsClientHttpRequestFactory);
    }

    public User getUserInfo(String userId) {
        // Fetch user details from the first API
        User user = new User();
        UserDetails userDetails = getUserDetails(userId);
        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setUserId(userDetails.getUserId());
        user.setEmail(userDetails.getEmail());
        user.setPhone(userDetails.getPhone());
        user.setDepartment(userDetails.getDepartment());
        user.setCostCenter(userDetails.getCostCenter());
        user.setTargetManagerID(userDetails.getTargetManagerUserId());
        user.setEntity(userDetails.getEntity());
        user.setLocation(userDetails.getLocation());

        if (userDetails.getOrgOfficeId()!=null) {
            DepartmentDetails departmentDetails = getOrgDetails(userDetails.getOrgOfficeId());
            user.setContractingArea(departmentDetails.getAbbreviation());
//            departmentHead=getDeptHead(userId);
            departmentHead=getDeptHead(userDetails.getTargetManagerUserId());
            user.setDepartmentHead(departmentHead);

        }

        return user;
    }

    public String getDeptHead(String currentManager) {
//        UserDetails user = getUserDetails(userId);
//        String currentManager = user.getTargetManagerUserId();
        fetchManager(currentManager);
        return departmentHead; // Return after the method finishes
    }

    private void fetchManager(String currentManager) {
        UserDetails manager = getUserDetails(currentManager);
        String orgID = manager.getOrgOfficeId();
        String nextManager = manager.getTargetManagerUserId();
        fetchOrg(orgID, currentManager, nextManager);
    }

    private void fetchOrg(String orgID, String currentManager, String nextManager) {
        DepartmentDetails department = getOrgDetails(orgID);
        String orgType = department.getType(); // Ensure local orgType

        if ("D".equals(orgType)) {
            departmentHead = currentManager;

        } else if ("G".equals(orgType)) {
            fetchManager(nextManager); // Recursive call to find the next manager
        }
    }

    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("KeyId", "25498ee0-74eb-460c-a343-681624e29d0d"); // Set your API key here
        headers.set("Content-Type", "application/json");
        return headers;
    }

    public UserDetails getUserDetails(String userId) {
        final String apiUrl1 = "https://ews-bcn.api.bosch.com/information-and-data/master/hr/compas-gen/q/v1/contracts/";
        String userApiUrl = apiUrl1 + userId;
        HttpHeaders headers = createHeaders();

        // Build the request with headers
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<UserResponse> userResponseEntity = restTemplate.exchange(userApiUrl, HttpMethod.GET, entity, UserResponse.class);

        return Objects.requireNonNull(userResponseEntity.getBody()).getData();
    }

    public DepartmentDetails getOrgDetails(String orgId) {
        final String apiUrl2 = "https://ews-bcn.api.bosch.com/information-and-data/master/hr/compas-org-gen/q/v1/orgoffices/";
        String userApiUrl = apiUrl2 + orgId;
        HttpHeaders headers = createHeaders();// Build the request with headers
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<DepartmentResponse> DepartmentResponseEntity = restTemplate.exchange(userApiUrl, HttpMethod.GET, entity, DepartmentResponse.class);

        return Objects.requireNonNull(DepartmentResponseEntity.getBody()).getData();
    }

}
























