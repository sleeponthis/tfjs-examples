/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import * as tf from '@tensorflow/tfjs';
import * as ui from './ui';
import * as util from './util';

/**
 * Load pretrained model stored at a remote URL.
 *
 * @return An instance of `tf.Model` with model topology and weights loaded.
 */
export async function loadHostedPretrainedModel(url) {
  ui.status('Loading pretrained model from ' + url);
  try {
    const model = await tf.loadModel(url);
    ui.status('Done loading pretrained model.');
    return model;
  } catch (err) {
    console.log(err);
    ui.status('Loading pretrained model failed.');
  }
}

/**
 * Load data file stored at a remote URL.
 *
 * @return An object containing metadata as key-value pairs.
 */
export async function loadHostedData(url, numClasses) {
  ui.status('Loading data from ' + url);
  try {
    const raw = await fetch(url);
    const data = await raw.json();
    const result = util.convertDataToTensors(data, numClasses);
    result['data'] = data;
    ui.status('Done loading data.');
    return result;
  } catch (err) {
    console.log(err);
    ui.status('Loading data failed.');
  }
}
