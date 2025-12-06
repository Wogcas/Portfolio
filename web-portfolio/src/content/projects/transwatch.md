---
title: Transwatch
description: Transwatch is our proposal that fulfills the task of data visualization and information management related to and focused on parking lots or traffic booths, providing traffic assessment, environmental considerations, and support with lighting and sensors.
img: /images/Transwatch.png
techs: ["python","azure","arduino","nodejs","express","docker"]
git-repository: https://github.com/Victoro2304/Transwatch
date:
    start: Oct 2025
    end: Dec 2025
---

In this project, I orchestrated the configuration and administration of the entire Cloud environment, architecting a robust Fog-to-Cloud communication system on Microsoft Azure.

I implemented the connection using Python, transmitting device telemetry via MQTT directly to the Azure IoT Hub. To manage data persistence, I configured a custom message routing endpoint within the Hub that automatically channeled the traffic into a dedicated Azure Storage Account that I provisioned and managed.

Finally, I improved my Node.js skills to build an Express server using Azure SDKs, creating an API that queried the stored data to populate a client-facing dashboard.