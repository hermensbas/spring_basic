package nl.overheid.koop.basic.application.test;

import io.restassured.RestAssured;
import io.restassured.specification.RequestSpecification;

public enum RestAssuredHelper {
    ; // empty enum with only static functions

    public static RequestSpecification loggedOnAs(final String user, final String password) {

        return RestAssured
            .given()
            .relaxedHTTPSValidation()
            .auth()
            .preemptive()
            .basic(user, password);
    }

}
