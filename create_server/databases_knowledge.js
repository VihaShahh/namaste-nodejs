// 🧩 Types of Databases (with examples)

// Let’s look at some popular types 

// 1️⃣ Relational Database (SQL)

// 🧱 Examples: MySQL, PostgreSQL

// Stores data in tables (rows and columns).

// Uses SQL (Structured Query Language) to interact with data.

// Has a fixed schema — meaning data structure is predefined.

// Follows ACID properties (for reliability & consistency).

// ✅ Best for: Banking systems, e-commerce apps, and enterprise software.

// 2️⃣ NoSQL Database

// 📦 Example: MongoDB

// Stores data in flexible, JSON-like documents instead of tables.

// Schema is dynamic — new fields can be added anytime.

// Scales easily across many servers.

// Great for unstructured or semi-structured data.

// ✅ Best for: Social media apps, chat apps, and real-time analytics.

// 3️⃣ In-Memory Database

// ⚡ Example: Redis

// Stores data in RAM (memory) instead of on disk → very fast!

// Used for caching, real-time analytics, and message queues.

// ✅ Best for: Leaderboards, sessions, caching APIs, etc.

// 4️⃣ Distributed SQL Database

// 🌍 Example: CockroachDB

// Acts like a relational DB but spread across multiple machines.

// Keeps strong consistency and high availability.

// ✅ Best for: Global-scale apps needing 24/7 uptime.

// 5️⃣ Time-Series Database

// 🕒 Example: InfluxDB

// Designed for time-based data (data with timestamps).

// Very efficient for IoT sensors, metrics, or monitoring systems.

// ✅ Best for: Tracking temperature, system performance, stock prices, etc.

// 6️⃣ Object-Oriented Database

// 🎯 Example: db4o

// Stores data as objects (like in programming languages).

// No need to convert data into tables.

// ✅ Best for: Apps heavily using object-oriented design (Java, C#).

// 7️⃣ Graph Database

// 🕸️ Example: Neo4j

// Data is stored as nodes and relationships (edges).

// Perfect for tracking connections between entities.

// ✅ Best for: Social networks, recommendation engines, fraud detection.

// 8️⃣ Hierarchical Database

// 🌲 Example: IBM IMS

// Data is stored in a tree-like structure (parent → child).

// Very fast for specific legacy applications.

// ✅ Best for: Mainframes, legacy transaction systems.

// 9️⃣ Network Database

// 🔗 Example: IDMS

// Similar to hierarchical DBs but allows many-to-many relationships.

// Data is connected like a graph of records.

// ✅ Best for: Old systems needing complex relationships.

// 🔟 Cloud Database

// ☁️ Example: Amazon RDS

// Databases hosted on the cloud.

// Can automatically handle backups, scaling, and updates.

// Best for: Modern applications with changing workloads.

//=====================================================================
// Main Types of NoSQL Databases:

// Type	Description	Example:

// 1 - Document DB	Stores data in JSON-like documents	MongoDB
// 2 - Key-Value DB	Stores data as key-value pairs	Redis
// 3 - Graph DB	Stores data as nodes & edges	Neo4j
// 4 - Wide-Column DB	Stores data in columns (not rows)	Cassandra
// 5 - Multi-Model DB	Supports multiple NoSQL models	ArangoDB

//===============================================================================
// Perfect question 👍 Let’s make this super simple to understand 👇

// ---

// ### 🧠 **What is Scalability?**

// **Scalability** means how well a system (like a database or server) can handle **increased load** — for example, more users, more data, or more requests — without crashing or slowing down too much.

// There are **two main types** of scalability:

// ---

// ### ⚙️ **1️⃣ Vertical Scalability (Scale Up)**

// ➡️ **Meaning:** Add more power (CPU, RAM, storage) to a **single machine**.
// 💡 Example:

// * You have one server. It’s getting slow.
// * You upgrade it to a faster processor, more memory, and better storage.

// ✅ **Pros:**

// * Simple to manage (only one machine).
//    **Cons:**
// * There’s a physical limit — you can’t keep upgrading forever.
// * If that one machine fails → everything stops.

// **Example:** A single big MySQL server upgraded with better specs.

// ---

// ### 🌐 **2️⃣ Horizontal Scalability (Scale Out)**

// ➡️ **Meaning:** Add **more machines (servers)** instead of making one stronger.
// 💡 Example:

// * You have 1 server.
// * You add 3 more servers.
// * The load gets shared among all 4.

// ✅ **Pros:**

// * Easier to scale infinitely (just add more servers).
// * If one fails, others can still work.
//    **Cons:**
// * More complex to manage (you need to sync data between servers).

// **Example:** MongoDB or Cassandra — you can distribute data across many servers easily.

// ---

// ## 💰 **Transactions**

// A **transaction** is a group of operations that should **either all happen or none happen** — like transferring money between accounts.
// In databases, how transactions are handled depends on whether it’s **SQL** or **NoSQL**.

// ---

// ### 🔒 **ACID (Used in SQL Databases like MySQL, PostgreSQL)**

// **ACID** ensures **reliability and accuracy** for transactions.

// | Term                | Meaning                                                   | Example                                               |
// | ------------------- | --------------------------------------------------------- | ----------------------------------------------------- |
// | **A - Atomicity**   | All steps of a transaction happen together or not at all. | Money transfer: debit and credit must both happen.    |
// | **C - Consistency** | Data must remain valid according to rules.                | Balance can’t be negative.                            |
// | **I - Isolation**   | Transactions don’t affect each other.                     | Two users transferring money at once don’t interfere. |
// | **D - Durability**  | Once done, it’s saved even if system crashes.             | After commit, data stays safe.                        |

//  **Best for:** Banking, finance, and applications needing 100% data correctness.

// ---

// ### ⚡ **BASE (Used in NoSQL Databases like MongoDB, Cassandra)**

// **BASE** sacrifices some strictness for **speed and flexibility**.

// | Term                          | Meaning                                                     | Explanation                               |
// | ----------------------------- | ----------------------------------------------------------- | ----------------------------------------- |
// | **B - Basically Available**   | System always responds, even if with outdated data.         | Always gives *some* result.               |
// | **S - Soft State**            | Data may change over time, not always instantly consistent. | Temporary inconsistency allowed.          |
// | **E - Eventually Consistent** | Data becomes consistent after a short delay.                | All nodes get the latest data eventually. |

//  **Best for:** Large-scale apps like social media, e-commerce, or real-time analytics — where *speed > perfect accuracy.*

// ---

// ### 🧩 **In Short:**

// | Feature         | SQL Databases (ACID)  | NoSQL Databases (BASE)          |
// | --------------- | --------------------- | ------------------------------- |
// | **Consistency** | Strong                | Eventual                        |
// | **Scalability** | Vertical              | Horizontal                      |
// | **Structure**   | Fixed schema (tables) | Flexible (documents, key-value) |
// | **Use Case**    | Banking, finance      | Social media, IoT, analytics    |


