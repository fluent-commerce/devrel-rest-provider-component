/*
  Copyright © 2024 Fluent Commerce - All Rights Reserved.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import { useRest } from 'mystique/hooks/useRest';
import { Children } from 'mystique/components/Children';
import { TemplateRegistry } from 'mystique/registry/TemplateRegistry';
import { FC, useState } from 'react';
import { Loading } from 'mystique/components/Loading';
import { decorateQueryResult } from '../../../lib/mystique-export';

export interface RestProviderProps {
  data: any;
  endpoint: string;
  props: Record<string, string>;
}

export const RestProvider: FC<RestProviderProps> = ({
  data,
  endpoint,
  props
}) => {
  const [endPointWithProps] = useState(
    () => `${endpoint}?${new URLSearchParams(getRenderedProps(props, data))}`
  );

  const response = useRest(endPointWithProps);

  switch (response.status) {
    case 'ok':
      return <Children dataOverride={decorateQueryResult(response.result)} />;

    case 'loading':
      return <Loading />;

    default:
      // includes "error"
      console.error(
        `Could not retrieve data from REST API: ${JSON.stringify(
          endPointWithProps
        )}\n Response: ${JSON.stringify(response, null, 2)}`
      );
      return <div>Error occurred loading data from REST API</div>;
  }
};

const getRenderedProps = (props: Record<string, string>, data: any) => {
  return Object.fromEntries(
    Object.entries(props).map(([key, value]) => [
      key,
      TemplateRegistry.render(value, data)
    ])
  );
};