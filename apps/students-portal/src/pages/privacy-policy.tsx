import React from "react";
import Head from "next/head";
import Image from "next/image";
import logo from "../assets/logo.png";


export default function PolicyPage() {

  return (
    <>
      <Head>
        <title>Privacy Policy - FutureLabs</title>
        <meta
          name="description"
          content="Read the Privacy Policy of FutureLabs to learn how we handle data and protect your information."
        />

        {/* Optional Open Graph tags for social sharing */}
        <meta property="og:title" content="Privacy Policy - FutureLabs" />
        <meta
          property="og:description"
          content="Learn about FutureLabs' Privacy Policy and data protection practices."
        />
        <meta property="og:type" content="website" />
      </Head>

      {/* <UserLayout userId="123" title="Privacy Policy" description="FutureLabs Privacy Policy"> */}

      <main className="max-w-4xl mx-auto p-6 text-gray-800 ">
       
          <Image src={logo} alt="FutureLabs Logo" className="mb-8" />
      

        <h1 className="text-3xl font-bold mb-6">FutureLabs NDPA Compliance</h1>
        <p className="mb-8">
          To comply with the Nigeria Data Protection Act (NDPA) 2023, FutureLabs
          has adopted the following policies and procedures.
        </p>

        {/* 1. Data Protection Policy */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">
            1. Data Protection Policy
          </h2>
          <p>
            <strong>Purpose:</strong> Ensures that FutureLabs handles all
            personal data in compliance with NDPA 2023.
          </p>
          <p>
            <strong>Scope:</strong> Applies to all employees, contractors,
            fellows, students, and third parties processing personal data.
          </p>
          <h3 className="font-medium mt-3">Key Principles:</h3>
          <ul className="list-disc ml-6">
            <li>
              Lawful Basis – Data shall be collected and processed lawfully,
              fairly, and transparently.
            </li>
            <li>
              Purpose Limitation – Data will only be used for specific,
              explicit, and legitimate purposes.
            </li>
            <li>
              Data Minimization – Only necessary data will be collected and
              retained.
            </li>
            <li>Accuracy – Data must be kept accurate and up-to-date.</li>
            <li>
              Storage Limitation – Data shall not be kept longer than necessary.
            </li>
            <li>
              Integrity & Confidentiality – Security measures must protect
              against unauthorized access or breach.
            </li>
            <li>
              Accountability – FutureLabs is responsible for demonstrating
              compliance.
            </li>
          </ul>
        </section>

        {/* 2. Privacy Notice */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">2. Privacy Notice</h2>
          <p>
            <strong>Who We Are:</strong> FutureLabs is a digital innovation hub
            that provides training, incubation, and digital services.
          </p>
          <h3 className="font-medium mt-3">What Data We Collect:</h3>
          <ul className="list-disc ml-6">
            <li>Identification data (name, email, phone number)</li>
            <li>Educational records (certificates, CVs)</li>
            <li>Financial information (payment records, bank details)</li>
            <li>Technical data (IP address, device info when using our LMS)</li>
          </ul>
          <h3 className="font-medium mt-3">Why We Collect Your Data:</h3>
          <ul className="list-disc ml-6">
            <li>To deliver training and incubation programs</li>
            <li>To communicate with you</li>
            <li>To fulfill legal obligations</li>
            <li>To improve our services and learning platforms</li>
          </ul>
          <h3 className="font-medium mt-3">How We Share Data:</h3>
          <ul className="list-disc ml-6">
            <li>With regulators where legally required</li>
            <li>With partners (only with safeguards)</li>
            <li>With payment providers for financial transactions</li>
          </ul>
          <h3 className="font-medium mt-3">Your Rights:</h3>
          <ul className="list-disc ml-6">
            <li>Right to access your data</li>
            <li>Right to rectify inaccuracies</li>
            <li>Right to withdraw consent</li>
            <li>Right to deletion (where applicable)</li>
            <li>
              Right to lodge complaints with the{" "}
              <strong>Nigeria Data Protection Commission (NDPC)</strong>
            </li>
          </ul>
          <p className="mt-3">
            <strong>Contact:</strong>{" "}
            <a
              href="mailto:privacy@futurelabs.ng"
              className="text-blue-600 underline"
            >
              privacy@futurelabs.ng
            </a>
          </p>
        </section>

        {/* <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">
            3. Data Processing Agreement (DPA)
          </h2>
          <p>
            This agreement regulates how vendors and partners process personal
            data on behalf of FutureLabs.
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>
              Processor must act only on FutureLabs’ documented instructions.
            </li>
            <li>
              Processor must implement technical and organizational security
              measures.
            </li>
            <li>Processor must assist with data subject rights requests.</li>
            <li>
              Processor must notify FutureLabs immediately in case of a breach.
            </li>
            <li>Processor must delete or return data after services end.</li>
          </ul>
        </section>

       
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">
            4. Data Subject Rights Request Form
          </h2>
          <p>Individuals may use this form to exercise their rights:</p>
          <ul className="list-disc ml-6">
            <li>Full name</li>
            <li>Contact details</li>
            <li>Type of request (Access, Correction, Deletion, etc.)</li>
            <li>Description of request</li>
            <li>ID verification</li>
            <li>Date & Signature</li>
          </ul>
        </section>


        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">
            5. Data Breach Management Procedure
          </h2>
          <ol className="list-decimal ml-6">
            <li>Identify and contain the breach immediately.</li>
            <li>Report internally to the DPO.</li>
            <li>Assess risk and document details.</li>
            <li>Notify NDPC within 72 hours if significant.</li>
            <li>Notify affected individuals if high risk exists.</li>
            <li>Review lessons and update security measures.</li>
          </ol>
        </section>

        
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">
            6. NDPA Compliance Brochure
          </h2>
          <h3 className="font-medium">Front:</h3>
          <p>
            <em>FutureLabs & Your Data</em> – Protecting your information under
            NDPA 2023.
          </p>
          <h3 className="font-medium mt-3">Inside:</h3>
          <ul className="list-disc ml-6">
            <li>We collect data responsibly</li>
            <li>
              We only use data for training, incubation, and communication
            </li>
            <li>We do not sell your data</li>
            <li>
              Your rights: Access | Correction | Deletion | Withdraw Consent
            </li>
            <li>DPO ensures compliance</li>
            <li>
              Email:{" "}
              <a
                href="mailto:privacy@futurelabs.ng"
                className="text-blue-600 underline"
              >
                privacy@futurelabs.ng
              </a>
            </li>
          </ul>
          <h3 className="font-medium mt-3">Back:</h3>
          <p>
            <em>FutureLabs: Building trust through responsible data use.</em>
          </p>
        </section> */}
      </main>
      {/* </UserLayout>  */}
    </>
  );
}
