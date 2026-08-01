import assert from "node:assert/strict";
import test from "node:test";
import { jobDetails, productCopy } from "../src/react-app/content/adapt-quiz";

test("exposes the approved prototype identity and job facts", () => {
	assert.equal(productCopy.name, "aDaptQuiz");
	assert.equal(productCopy.interfaceLanguage, "English");
	assert.equal(jobDetails.company, "aDapt Family Solutions Ltd");
	assert.equal(jobDetails.reference, "TECH001");
	assert.equal(jobDetails.pay, "$30/hour");
	assert.equal(jobDetails.sourceUrl, "https://www.sjs.co.nz/job-details/2304/computer-tech-online-forms-3628");
});
