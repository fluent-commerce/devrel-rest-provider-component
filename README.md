# RestProvider Component
Brought to you by the Developer Relations team at Fluent Commerce

## Overview

This component enables the display of data from Fluent REST APIs in standard Component Library components.

This serves as an example and a starting point to enable display of REST API based data in standard components without the need to write custom components for each REST API call.

Not all capabilities may be present.

Read the How to Guide: [Display REST API Data in Standard Component Library Components](https://docs.fluentcommerce.com/by-type/display-rest-api-data-in-standard-library-components)

## Add the Rest Provider Component to your Component plugin project

_**Note:** If you don't already have a custom Component plugin project, follow the [Component SDK Getting Started](https://docs.fluentcommerce.com/by-type/component-sdk-getting-started) guide to create a new Component plugin._

1. Copy the `src/components/providers/RestProvider.tsx` into your Component plugin
2. Register the component in your `index.tsx`
3. Build and start the plugin locally


## Add the plugin to your main web app mainfest

_**Note:** If you don't already have the manifest overrides, follow the [How to override a default manifest document](https://docs.fluentcommerce.com/essential-knowledge/getting-started-configuring-fluent-oms-webapps#:~:text=How%20to%20override%20a%20default%20manifest%20document) guide to override the Fluent OMS Manifest._

1. Add the following to the `plugins` array in your `fc.mystique.manifest.oms`:

```json
{
  "type": "url",
  "src": "http://localhost:3001"
}
```

## Add the Sample Events Dashboard Page to your Account

_**Note:** If you don't already have the manifest overrides, follow the [How to override a default manifest document](https://docs.fluentcommerce.com/essential-knowledge/getting-started-configuring-fluent-oms-webapps#:~:text=How%20to%20override%20a%20default%20manifest%20document) guide to override the Insights Fragment._

1. Copy the JSON page definition from the `manifests/snippets/devrel.mystique.manifest.snippet.page.events.dashboard.json` file into your chosen manifest fragement


## Configuring the RestProvider

Sample manifest configuration:

```json
{
  "component": "devrel.provider.rest",
  "props": {
    "endpoint": "api/v4.1/event",
    "props": {
      "context.entityType": "ORDER",
      "eventType": "ORCHESTRATION",
      "eventStatus": "FAILED",
      "from": "{{dateStringFormatter (dateSubtract hours=24) 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' true}}"
    }
  },
  "descendants": [
    {
      "component": "fc.dashboard.threshold",
      "props": {
        "label": "Failed",
        "value": "{{ results.length }}",
        "thresholdLow": 1,
        "thresholdHigh": 5,
        "link": "#/events?context.entityType=ORDER&eventType=ORCHESTRATION&eventStatus=FAILED&from={{dateStringFormatter (dateSubtract hours=24) 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' true}}"
      }
    }
  ]
}
```

# Licence Info

Please see [LICENSE.md](LICENSE.md)

---

# Component SDK Help

[See the Component SDK documentation](https://docs.fluentcommerce.com/essential-knowledge/component-sdk-overview)


---

Copyright © 2024 Fluent Commerce
