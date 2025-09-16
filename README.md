# J-PRAT (Jharkhand - Provenance Recognition & Authentication)

![SIH 2025](https://img.shields.io/badge/Smart%20India%20Hackathon-2025-orange) ![Python](https://img.shields.io/badge/Python-3.9+-blue.svg) ![React](https://img.shields.io/badge/React-18-blue.svg) ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

**Team:** Victus
**Problem Statement:** Fake Degree/Certificate Recognition System for the state of Jharkhand.

J-PRAT is an AI-powered, blockchain-secured platform designed to detect and prevent academic certificate forgery, restoring trust and integrity to educational credentials.

---

### Table of Contents
1.  [The Problem](#the-problem)
2.  [Our Solution](#our-solution)
3.  [Key Features](#key-features)
4.  [System Workflow](#system-workflow)
5.  [Technology Stack](#technology-stack)
6.  [Local Setup & Installation](#local-setup--installation)
7.  [Team Victus](#team-victus)
8.  [License](#license)

---

### 1. The Problem
The rising prevalence of fake and forged academic degrees poses a significant threat to academic integrity, employer trust, and public welfare. Traditional verification methods are manual, slow, and susceptible to corruption, creating an urgent need for a robust, scalable, and secure digital solution.

### 2. Our Solution
J-PRAT is a comprehensive platform that provides instant and reliable verification of academic credentials. It employs a two-pronged approach to create a tamper-proof academic ecosystem:

* **For Legacy Certificates:** It uses a sophisticated AI forensics pipeline to analyze scanned documents for any signs of visual tampering or data inconsistency.
* **For Modern Certificates:** It leverages a private blockchain to notarize new certificates, making them mathematically impossible to forge or alter.

![J-PRAT Workflow](https://i.imgur.com/uRjXp6j.png)
*(This diagram illustrates the core flow from forgery detection to final verification)*

### 3. Key Features
* 🧠 **AI Forensic Analysis:** A suite of specialized AI models (including Siamese Networks) that perform deep visual analysis of a certificate's layout, seal, logo, and signature to detect sophisticated forgeries.
* 📄 **Intelligent Dual-OCR:** A cost-effective OCR strategy that uses high-performance open-source models as a baseline and intelligently falls back to state-of-the-art cloud services (like AWS Textract) for complex documents or low-confidence extractions.
* 🔗 **Immutable Blockchain Notarization:** Utilizes Hyperledger Fabric to store a cryptographic hash of new certificates, providing a permanent and unchangeable proof of authenticity.
* 💾 **Robust Database Verification:** Cross-verifies extracted information against official, indexed university records for fast and reliable legacy certificate validation.
* 🖥️ **Admin Dashboard with Manual Review:** An intuitive dashboard for authorized officials to monitor verification trends and, crucially, a **human-in-the-loop system** to manually review documents flagged as "suspicious" by the AI.

### 4. System Workflow
Our system follows a refined 10-step process for maximum accuracy and efficiency:
1.  **Secure User Upload:** User uploads a certificate via a pre-signed S3 URL, which offloads traffic from our server for scalability.
2.  **Image Preprocessing:** The image is automatically cleaned, deskewed, and normalized to 300 DPI for consistent analysis.
3.  **AI Forensic Analysis:** A Siamese Network analyzes the layout, seal, and logo for structural integrity and similarity to official templates.
4.  **Intelligent Text Extraction:** OCR is performed using a primary/fallback model strategy.
5.  **Text Normalization:** Extracted text is cleaned and standardized using fuzzy matching.
6.  **Database Cross-Verification:** The cleaned text is matched against records in a secure PostgreSQL database.
7.  **Blockchain Verification:** For modern certificates, the document's hash is verified against the Hyperledger Fabric ledger.
8.  **AI Adjudication:** A central engine consolidates all data points to generate a final, weighted result.
9.  **Result & Reporting:** A clear result (Verified, Fake, Suspicious) is presented. Suspicious cases are sent to the Manual Review Queue.
10. **Admin Oversight:** Officials use the dashboard to monitor activity and resolve flagged cases.

### 5. Technology Stack
| Category | Technology |
| :--- | :--- |
| **Frontend** | React.js, Next.js, TailwindCSS, Chart.js |
| **Backend** | FastAPI (Python 3.9+) |
| **AI / Machine Learning**| PyTorch / TensorFlow, Siamese Networks, OpenCV, scikit-image, EasyOCR |
| **Cloud OCR Services** | AWS Textract, Google Cloud Vision API |
| **Database** | PostgreSQL, SQLAlchemy |
| **Blockchain** | Hyperledger Fabric, Web3.py |
| **Cloud & DevOps** | AWS S3, Docker |

### 6. Local Setup & Installation
To get a local copy up and running, follow these simple steps.

**Prerequisites:**
* Node.js (v16+)
* Python (v3.9+) with `pip`
* Docker (for database and blockchain services)

**Installation:**
1. Clone the repo
   ```sh
   git clone [https://github.com/your_username/j-prat.git](https://github.com/your_username/j-prat.git)
