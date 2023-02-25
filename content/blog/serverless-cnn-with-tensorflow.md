---
title: 'Deploying a serverless CNN with TensorFlow | Gonzalo Hirsch'
description: 'Publishing a machine learning model can be expensive with traditional computing resources. Deploying a serverless computing model with TensorFlow can be the way to go.'
headline: 'Deploying a serverless CNN with TensorFlow'
excerpt: 'Publishing a machine learning model can be expensive with traditional computing resources. Deploying a serverless computing model with TensorFlow can be the way to go.'
date: '2023-02-19T12:00:00'
dateUpdated: ''
author: 'Gonzalo Hirsch'
authorUrl: 'https://www.linkedin.com/in/gonzalo-hirsch/'
socialImage:
    src: '/img/blog--serverless-cnn-with-tensorflow.webp'
    mime: 'webp'
    alt: 'Illustration with the text "Serverless CNN with TensorFlow in AWS"'
    width: 1200
    height: 630
faq:
    - question: 'What is a Convolutional Neural Network?'
      answer: 'A Convolutional Neural Network (CNN) is a type of neural network capable of assigning importance to different features within images and differentiating one from another. These neural networks have had tremendous success in the image classification field and are one of the precursors of deep learning. A CNN uses a combination of convolution and pooling layers (to reduce the input size) to simulate what happens in the neural cortex of the brain. It is why this type of neural network is so successful.'
    - question: 'How to build and train a neural network?'
      answer: "To deploy a machine learning model, you need to build and train it. Note that building and training the model occur outside of the Lambda Function. That is because those operations take a considerable amount of time, so given Lambda Function's limitations, it is not viable to do so there. TensorFlow is one of the most important libraries that support creating and training neural networks and deep learning models. Building a neural network with TensorFlow is relatively simple, and TensorFlow offers a wide variety of tutorials on the topic and a tutorial on working with Node.js. The training process is simplified, as the library handles model validation using accuracy as a target metric.  Once the deep learning model finishes training and you are satisfied with the accuracy performance, exporting the model is the last step. TensorFlow generates files containing information on each neural network layer. In AWS Lambda Function, you can load your prediction model using those files. Doing this offloads the training process to your local machine while only having the finished model in your deployment."
# tags: []
---

**Artificial Intelligence** (AI) and **Machine Learning** (ML) are the crazes right now, going as far as pivoting entire businesses to focus on AI and deep learning chatbots (ChatGPT). Publishing a machine learning model to production can be expensive if you use traditional computing resources, but this is where serverless computing has an edge. Deploying a serverless CNN with TensorFlow can drastically reduce your operational costs. You can have a cheap neural network by leveraging [AWS Lambda](https://aws.amazon.com/lambda/) (or any other cloud computing provider, such as Google Cloud's [Cloud Functions](https://cloud.google.com/functions)).

I [recently deployed](https://numbers.gonzalohirsch.com/) a pre-trained model to a Lambda Function as an image classification service for hand-written digits using the MNIST dataset. I will guide you through my experience and how to overcome the most common pitfalls when working on this type of infrastructure.

## What is a Convolutional Neural Network?

A Convolutional Neural Network (CNN) is a type of neural network capable of assigning importance to different features within images and differentiating one from another. These neural networks have had tremendous success in the image classification field and are one of the precursors of deep learning. A CNN uses a combination of convolution and pooling layers (to reduce the input size) to simulate what happens in the neural cortex of the brain. It is why this type of neural network is so successful.

CNNs are not the focus of this blog, so I recommend reading this [introduction to CNNs](https://towardsdatascience.com/a-comprehensive-guide-to-convolutional-neural-networks-the-eli5-way-3bd2b1164a53) if you find the topic compelling.

## How to build and train a neural network?

To deploy a machine learning model, you need to build and train it. Note that building and training the model occur outside of the Lambda Function. That is because those operations take a considerable amount of time, so given Lambda Function's limitations, it is not viable to do so there. [TensorFlow](https://www.tensorflow.org/) is one of the most important libraries that support creating and training neural networks and deep learning models. In this case, I will focus on using TensorFlow for JavaScript, even though there are great Python libraries.

Building a neural network with TensorFlow is relatively simple, and TensorFlow offers a wide variety of [tutorials](https://www.tensorflow.org/js/tutorials) on the topic and a [tutorial](https://www.tensorflow.org/js/guide/nodejs) on working with Node.js. The training process is simplified, as the library handles model validation using accuracy as a target metric. An offline example can test the model in a real-world scenario. You can define the batch size and sample rate during training to have more control during the process.

Once the deep learning model finishes training and you are satisfied with the accuracy performance, exporting the model is the last step. TensorFlow generates files containing information on each neural network layer. In AWS Lambda Function, you can load your prediction model using those files. Doing this offloads the training process to your local machine while only having the finished model in your deployment. The next step is to deploy the model to your cloud infrastructure.

## Serverless deployment for your prediction model

Almost any tutorial you find out there either deploys the neural network on a compute resource (e.g., EC2) or uses a combination of custom Docker images (AWS ECR) and Elastic File System (AWS EFS) along with a Lambda Function as part of their serverless infrastructure. In most of those cases, the cost of the serverless architecture and the complexity of the deployment is still high. I found a simple way to store the model results on S3 and directly load them in the Lambda Function.

In my serverless architecture, the TensorFlow model export is copied to S3 (or even stored in the same function deployment) and then loaded in the function when creating the model. The model can then serve each request it gets and perform the prediction. The process of deployment has two main parts:

-   **Part 1**: Build and train the model. Once that finishes, export the model artifacts locally and copy them to an S3 bucket using the AWS CLI.

```bash
$ aws s3 cp LOCAL_PATH_TO_EXPORT s3://BUCKET_NAME_AND_KEY_HERE --recursive
```

-   **Part 2**: Write a Lambda Function that uses the HTTPS bucket endpoint to download the file and deploy that. Using the [Serverless Framework](https://www.serverless.com/) can simplify the deployment process. The input image can be sent directly as an image file, or you can accept a byte array. The model runs the inference, and the output layer's result is the response. The input layer format should be a tensor in the specific size required by the model.

```javascript
const tf = require('@tensorflow/tfjs');

// Store the TF model outside the function so it might be shared between instances
let model;

exports.handler = async (event, _) => {
    let body = {};
    let statusCode = 200;
    // We need to define no cache so that Github doesn't cache the image
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };
    try {
        switch (`${event.httpMethod} ${event.resource}`) {
            case 'POST /predict':
                // Check we have the data in the data property
                if (!event.body) throw new Error('Error/missing data parameter.');
                const bodyIn = JSON.parse(event.body);
                if (!Array.isArray(bodyIn.data) || bodyIn.data.length !== 784) throw new Error('Error/missing data parameter.');

                // Create the model if not present
                if (!model) model = await tf.loadLayersModel(process.env.MODEL_URL);

                // Making the prediction
                body = JSON.stringify({
                    result: model.predict(tf.tensor(bodyIn.data, [1, 28, 28, 1])).dataSync()
                });
                break;
            default:
                throw new Error(`Unsupported route: "${event.routeKey}".`);
        }
    } catch (err) {
        console.log(err);
        statusCode = 400;
        body = err.message;
    }

    return {
        statusCode,
        body,
        headers
    };
};
```

An improvement to the second part of the approach is using an AWS service called VPC Endpoint to access the model export privately. I won't dive into that for the sake of quickly and simply being able to deploy this infrastructure.

### Caveats with this approach

There are a few caveats when going with this deployment setup:

-   AWS Lambda has [strict limits](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html) on bundle sizes, which limits the compressed bundle size to 50 MB. The compressed size of `@tensorflow/tfjs` is more than 350 MB.
-   Cold stars in AWS Lambda can take considerable time. It should be taken into account when limiting the execution time.
-   If you have an API Gateway as a proxy to the Lambda function, your model cannot take more than 29 seconds to process the request. It shouldn't be an issue because prediction is extremely fast compared to training.
-   Private access to the model artifacts is not available out of the box. Using a signed URL or a VPC endpoint is recommended in secure applications.

### How to overcome these caveats

The hardest caveat to overcome is the bundle size limitation. Most serverless approaches you see online get around that limitation with other AWS services. Simple models for personal use might find this serverless infrastructure to be overkill. I tried a few options before landing on the one that solved my issue.

The first solution I tried was the [Serverless Framework Webpack](https://www.serverless.com/plugins/serverless-webpack) plugin, hoping that tree shaking would solve the issues, but the bundle size barely changed size. Later, I tried generating [size-optimized bundles](https://www.tensorflow.org/js/tutorials/deployment/size_optimized_bundles), but it didn't work with `@tensorflow/tfjs-node`, so it wasn't viable and didn't affect the bundle size much. The best solution was using the `serverless.yml` configuration to remove unnecessary TS, HTML, and map files from the `node_modules` deployment.

```yaml
package:
    individually: true
    patterns:
        # Other ignored patterns
        - '!node_modules/**/README.md'
        - '!node_modules/**/LICENSE'
        - '!node_modules/**/**.map'
        - '!node_modules/**/**.html'
        - '!node_modules/**/**.ts'
        - '!.env**'
```

It prevents the framework from including those unnecessary files, thus reducing the bundle size.

It is also necessary to switch from `@tensorflow/tfjs-node` to `@tensorflow/tfjs` because although the Node version might be faster, the dependencies are the main contributors to the bundle size. It doesn't affect performance significantly because the inference and prediction processes are already quick.

## Bonus: Sending data from the front-end

In case you need to create a front-end application to accompany your service. I can guide you on how to approach that. A simple HTML canvas can handle input with the mouse and mobile touch.

```html
<canvas id="can" width="308" height="308" style="border:2px solid;"></canvas>
```

To support writing and sending the information to the API, the following code is required:

```javascript
// Drawing variables
let canvas,
    ctx,
    infoText,
    btnClear,
    btnPredict,
    flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false,
    w,
    h;
const STROKE_STYLE = 'black',
    STROKE_WIDTH = 16,
    TARGET_WIDTH = 28,
    TARGET_HEIGHT = 28;

// API variables
const API_URL = 'https://api.numbers.gonzalohirsch.com/predict';

const init = () => {
    canvas = document.getElementById('can');
    infoText = document.getElementById('info-text');
    btnClear = document.getElementById('clear-btn');
    btnPredict = document.getElementById('predict-btn');
    ctx = canvas.getContext('2d');
    w = canvas.width;
    h = canvas.height;

    // Listeners for the mouse event
    canvas.addEventListener('mousemove', (e) => findxy('move', e), false);
    canvas.addEventListener('mousedown', (e) => findxy('down', e), false);
    canvas.addEventListener('mouseup', (e) => findxy('up', e), false);
    canvas.addEventListener('mouseout', (e) => findxy('out', e), false);

    // Listeners for mobile touch event
    canvas.addEventListener('touchstart', (e) => findxy('down', e.touches[0]), false);
    canvas.addEventListener(
        'touchmove',
        (e) => {
            findxy('move', e.touches[0]);
            e.preventDefault();
        },
        false
    );
    canvas.addEventListener('touchend', (e) => findxy('up', e.changedTouches[0]), false);

    // Set info text hidden
    hideInfoText();
};

const draw = () => {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.lineCap = 'round';
    ctx.strokeStyle = STROKE_STYLE;
    ctx.lineWidth = STROKE_WIDTH;
    ctx.stroke();
    ctx.closePath();
};

const clearDrawing = () => {
    hideInfoText();
    ctx.clearRect(0, 0, w, h);
};

// Handles the prediction of the drawing
const predictDrawing = async () => {
    showInfoText('Predicting...');

    setButtonState(false);

    // Get the pixels
    const pixels = getPixelBuffer();

    // Send the pixels as POST to the API
    const response = await fetch(API_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: pixels
        })
    }).then((res) => res.json());

    // Get the best result
    const result = findBestResult(response.result);

    // Show the result
    showInfoText(`The model predicted the number to be a <u>${result[0]}</u> with <u>${toFixed(result[1], 2)}%</u> confidence.`);

    setButtonState(true);
};

const getPixelBuffer = () => {
    // Get the buffer with the data and keep only the alpha values
    const bufferArr = new Uint8ClampedArray(ctx.getImageData(0, 0, w, h).data.buffer);
    const rawPixels = [];
    for (let i = 3; i < bufferArr.length; i += 4) rawPixels.push(bufferArr[i]);
    // Take only the alpha and map to 1, join every X numbers
    const groupW = w / TARGET_WIDTH,
        groupH = h / TARGET_HEIGHT;
    const pixels = [];
    // Iterate all the target pixels
    for (let i = 0; i < TARGET_WIDTH; i++) {
        for (let j = 0; j < TARGET_HEIGHT; j++) {
            // Get the groupW and groupH pixels
            let max = 0;
            for (let buffI = groupW * i; buffI < groupW * (i + 1); buffI++) {
                for (let buffJ = groupH * j; buffJ < groupH * (j + 1); buffJ++) {
                    max = Math.max(max, rawPixels[buffI * w + buffJ]);
                }
            }
            pixels.push(max / 255);
        }
    }
    return pixels;
};

const findxy = (res, e) => {
    if (res == 'down') {
        computePosition(e);
        flag = true;
        ctx.beginPath();
        ctx.fillStyle = STROKE_STYLE;
        ctx.fillRect(currX, currY, 2, 2);
        ctx.closePath();
    }
    if (res == 'up' || res == 'out') flag = false;
    if (res == 'move' && flag) {
        computePosition(e);
        draw();
    }
};

const computePosition = (e) => {
    prevX = currX;
    prevY = currY;
    const rect = e.target.getBoundingClientRect();
    currX = e.clientX - rect.left;
    currY = e.clientY - rect.top;
};

// ####################################################################################
// RESULT DISPLAYING
// ####################################################################################

const hideInfoText = () => {
    infoText.style.display = 'none';
};

const showInfoText = (text) => {
    infoText.innerHTML = text;
    infoText.style.display = 'block';
};

const findBestResult = (results) => {
    let maxKey = '0';
    // Compute maximum key
    Object.keys(results).forEach((key) => {
        if (results[key] > results[maxKey]) maxKey = key;
    });
    // Return the key and confidence score
    return [maxKey, results[maxKey] * 100];
};

function toFixed(num, fixed) {
    var re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}

// ####################################################################################
// BUTTON HANDLING
// ####################################################################################

const setButtonState = (enabled) => {
    btnClear.disabled = !enabled;
    btnPredict.disabled = !enabled;
};
```

Note that an algorithm to group and translate the pixels into the 28x28 image required by my application is required. You can divide the drawn image pixels in a larger 28x28 grid that groups and takes the maximum pixel value.

## Closing thoughts

I hope this tutorial helps you deploy your ML models without worrying about complex serverless architectures. Don't feel limited by image prediction or inference models. There are countless applications, such as Natural Language Processing, analytics, and data science. Deploying a serverless CNN with TensorFlow might be the first step in your Artificial Intelligence career.

I have open-sourced the code for the [front end](https://github.com/GonzaloHirsch/numbers.gonzalohirsch.com) and [API](https://github.com/GonzaloHirsch/ml-numbers-serverless-api) for public use, so enjoy it. You can test the live model [here](https://numbers.gonzalohirsch.com/).
