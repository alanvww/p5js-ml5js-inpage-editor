'use client';

// Alan Ren
// 2024-02-20
// ml5.js + p5.js in-page code editor

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable';
import { buttonVariants } from '@/components/ui/button';

import React from 'react';
import Link from 'next/link';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

export default function Home() {
	// CodeMirror Content
	const [code, setCode] = React.useState(`// Paste your p5.js codes here
	
	function setup() {
		// Create the canvas
		let canvas = createCanvas(windowWidth, windowHeight);
		// For centering content
		let x = (windowWidth - width) / 2;
		let y = (windowHeight - height) / 2;
		canvas.position(x, y);
		background(200);
	}

	function draw() {}

	/* ml5 facemesh example
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
	
	*/
  `);

	// CodeMirror onChange
	const onChange = React.useCallback(
		(val: any, viewUpdate: any) => {
			setPreviousCode(code);
			setCode(val);
		},
		[code] // No dependencies required here
	);

	// Previous code state
	const [previousCode, setPreviousCode] = React.useState(code);

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

	// Loading state
	const [isLoading, setIsLoading] = React.useState(false);

	// iframe reference
	const refIframe = React.useRef<HTMLIFrameElement>(null);
	// iframe srcDoc for rendering the code
	const [iframSrc, setIframeUrl] = React.useState(htmlTop + code + htmlBottom);
	// const [iframeErrors, setIframeErrors] = React.useState([]);

	// Function to refresh the iframe
	const refreshIframe = () => {
		// determine the loading state
		if (previousCode !== code) {
			setIsLoading(true);
			setIframeUrl(htmlTop + code + htmlBottom);
		} else {
			setIsLoading(false);
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
		<main className="min-h-screen bg-[#292C33]">
			<div className="flex flex-row justify-start items-center gap-x-4 h-[4vh] ">
				<h1 className="inline text-2xl font-mono font-bold mx-4">
					Code Editor
				</h1>
				{isLoading ? (
					<button
						onClick={refreshIframe}
						className={
							'h-[2vh] align-baseline flex items-center justify-center "inline-blocktransition duration-150 ease-in-out focus:outline-none focus:ring-0' +
							buttonVariants({ variant: 'default' })
						}
						type="button"
					>
						<div
							role="status"
							className="inline-block h-3 w-3 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
						>
							<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
								Loading...
							</span>
						</div>
						Loading
					</button>
				) : (
					<Link
						href="#"
						onClick={refreshIframe}
						className={
							'h-[2vh] align-baseline flex items-center justify-center ' +
							buttonVariants({ variant: 'default' })
						}
					>
						<StartIcon />
					</Link>
				)}
			</div>

			<div className="flex flex-col items-center justify-between ">
				<ResizablePanelGroup direction="horizontal">
					<ResizablePanel>
						<CodeMirror
							value={code}
							height="95vh"
							theme="dark"
							extensions={[javascript({})]}
							onChange={onChange}
						/>
					</ResizablePanel>
					<ResizableHandle />
					<ResizablePanel>
						<ResizablePanelGroup direction="vertical">
							<ResizablePanel defaultSize={75}>
								<iframe
									className="w-full h-full min-h-fit min-w-full"
									title="canvas"
									id="canvasFrame"
									srcDoc={iframSrc}
									ref={refIframe}
									onLoad={() => {
										console.log('iFrame Loaded');
										setIsLoading(false); // Set loading to false when iframe is loaded
									}}
								></iframe>
							</ResizablePanel>
							<ResizableHandle />
							<ResizablePanel defaultSize={25}>
								{/* 'Placeholder for console */}
							</ResizablePanel>
						</ResizablePanelGroup>
					</ResizablePanel>
				</ResizablePanelGroup>
			</div>
		</main>
	);
}
