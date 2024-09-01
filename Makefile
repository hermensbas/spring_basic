.PHONY: help compile build run-spring run-jar utests rtests deps

CURRENT_DIR = $(realpath .)
MAVEN_CLI_OPTS = --fail-at-end --show-version -Dmaven.plugin.validation=VERBOSE

help:
	@echo "Available targets for:"
	@echo "########################################################################################"
	@echo "  - help\t\t\tThis help"
	@echo "  - compile\t\t\tCompiles the code"
	@echo "  - build\t\t\tBuilds the code (clean, validate, compile, test, package, verify)"
	@echo "  - run-spring\t\t\tRun code with maven spring"
	@echo "  - run-jar\t\t\tRun code with plain old jar"
	@echo "  - utests\t\t\tRun unit tests"
	@echo "  - rtests\t\t\tRun regression tests"
	@echo "  - deps\t\t\tShow dependency tree"
	@echo "########################################################################################"

compile:
	@echo "########################################################################################"
	@echo "## mvn clean compile"
	@echo "########################################################################################"
	@echo "########################################################################################"
	@clear
	@mvn clean compile ${MAVEN_CLI_OPTS}

build:
	@echo "########################################################################################"
	@echo "## mvn clean verify"
	@echo "########################################################################################"
	@echo "########################################################################################"
	@clear
	@mvn clean verify ${MAVEN_CLI_OPTS}

run-spring:
	@echo "########################################################################################"
	@echo "## mvn clean spring-boot:run"
	@echo "########################################################################################"
	@echo "########################################################################################"
	@clear
	@mvn clean spring-boot:run

run-jar: build
	@echo "########################################################################################"
	@echo "## java -jar -Dapplication.load-info.enabled=false target/spring_basic-*.jar"
	@echo "########################################################################################"
	@echo "########################################################################################"
	@clear
	@java -jar -Dapplication.load-info.enabled=false target/spring_basic-*.jar

utests:
	@echo "########################################################################################"
	@echo "## mvn test (note; todo implement category unit and regression -tests)"
	@echo "########################################################################################"
	@echo "########################################################################################"
	@clear
	@mvn test

rtests:
	@echo "########################################################################################"
	@echo "## mvn test (placeholder see unit-test note"
	@echo "########################################################################################"
	@echo "########################################################################################"
	@clear
	@mvn test

deps:
	@echo "########################################################################################"
	@echo "## mvn dependency:tree"
	@echo "########################################################################################"
	@echo "########################################################################################"
	@clear
	@mvn dependency:tree