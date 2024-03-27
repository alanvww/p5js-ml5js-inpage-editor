import React, { useState } from 'react';
import ReactCodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';

const App: React.FC = () => {
	const [code, setCode] = useState(`
	// Copyright (c) 2023 ml5
	//
	// This software is released under the MIT License.
	// https://opensource.org/licenses/MIT
	
	let facemesh;
	let video;
	let faces = [];
	let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };
	
	function preload() {
	  // Load the facemesh model
	  facemesh = ml5.facemesh(options);
	}
	
	function setup() {
	  createCanvas(640, 480);
	  // Create the webcam video and hide it
	  video = createCapture(VIDEO);
	  video.size(width, height);
	  video.hide();
	  // Start detecting faces from the webcam video
	  facemesh.detectStart(video, gotFaces);
	}
	
	function draw() {
	  // Draw the webcam video
	  image(video, 0, 0, width, height);
	
	  // Draw all the tracked face points
	  for (let i = 0; i < faces.length; i++) {
		let face = faces[i];
		for (let j = 0; j < face.keypoints.length; j++) {
		  let keypoint = face.keypoints[j];
		  fill(0, 255, 0);
		  noStroke();
		  circle(keypoint.x, keypoint.y, 5);
		}
	  }
	}
	
	// Callback function for when facemesh outputs data
	function gotFaces(results) {
	  // Save the output to the faces variable
	  faces = results;
	  //console.log(faces);
	}
  `);
	const [iframeSrc, setIframeSrc] = useState('');

	// HTML content Top and Bottom
	const htmlTop = `<!doctype html>
	<html>
  <head>
  <meta charset="UTF-8" />
  <title>ml5.js+p5.js in-page code editor</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.js"></script>
  <script src="https://unpkg.com/ml5@0.20.0-alpha.3/dist/ml5.js"></script>
</head>
	<body>
	<div id="container">
        <div id="sketch">
        </div>
    </div>
	<script>`;

	const htmlBottom = `
  </script>
	</body>
	</html>`;

	const updateIframeContent = (mode: string) => {
		if (mode === 'p5') {
			const blob = new Blob([htmlTop + code + htmlBottom], {
				type: 'text/html',
			});
			setIframeSrc(URL.createObjectURL(blob));
		} else {
			const blob = new Blob(['Clear!'], { type: 'text/html' });
			setIframeSrc(URL.createObjectURL(blob));
		}
	};

	// svg start icon
	const StartIcon = () => (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M8 5V19L19 12L8 5Z"
				fill="currentColor"
			/>
		</svg>
	);

	return (
		<ResizablePanelGroup direction="horizontal">
			<ResizablePanel>
				<ReactCodeMirror
					value={code}
					height="100vh"
					extensions={[javascript()]}
					onChange={(value) => setCode(value)}
				/>
			</ResizablePanel>
			<ResizableHandle />
			<ResizablePanel>
				<div className="flex justify-center">
					<Button
						className={
							'h-[2vh] align-baseline flex items-center justify-center "inline-blocktransition duration-150 ease-in-out focus:outline-none focus:ring-0'
						}
						variant="outline"
						onClick={() => updateIframeContent('p5')}
					>
						{' '}
						<StartIcon />
						Start
					</Button>
					<Button
						className={
							'h-[2vh] align-baseline flex items-center justify-center "inline-blocktransition duration-150 ease-in-out focus:outline-none focus:ring-0'
						}
						variant="outline"
						onClick={() => updateIframeContent('clear')}
					>
						{' '}
						Clear
					</Button>
				</div>

				<iframe
					src={iframeSrc}
					style={{ width: '100%', height: '100vh', border: 'none' }}
					title="Preview"
				></iframe>
			</ResizablePanel>
		</ResizablePanelGroup>
	);
};

export default App;
