/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { logEvent } from 'src/logger/actions';

export default function useLogAction(staticEventData: Record<string, any>) {
  const dispatch: any = useDispatch();
  const logAction = useCallback<typeof logEvent>(
    (type, payload) =>
      dispatch(
        logEvent(type, {
          payload: {
            ...staticEventData,
            ...payload,
          },
        }),
      ),
    [staticEventData, dispatch],
  );

  return logAction;
}
