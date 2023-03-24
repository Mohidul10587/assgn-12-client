import React from 'react';

function Portfolio() {
  return (
    <div className="bg-gray-200 min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">My Portfolio</h1>
        </div>
      </header>
      <main className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-bold text-gray-900">About Me</h2>
            <p className="mt-2 text-gray-600">
              I am a full stack web developer with experience in React, Tailwind CSS, Firebase, ExpressJS, and MongoDB.
            </p>
          </div>
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
            <ul className="list-disc list-inside mt-2">
              <li>React</li>
              <li>Tailwind CSS</li>
              <li>Firebase</li>
              <li>ExpressJS</li>
              <li>MongoDB</li>
            </ul>
          </div>


          
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
            <ul className="list-disc list-inside mt-2">
              <li>
                <a href="https://shopping-world.netlify.app" className="text-blue-600 hover:underline">
                shopping-world
                </a>
              </li>
              <li>
                <a href="https://myitpark.netlify.app" target={'_blank'} className="text-blue-600 hover:underline">
            It park
                </a>
              </li>
              <li>
                <a href="https://surve.netlify.app" target={'_blank'} className="text-blue-600 hover:underline">
                Survey
                </a>
              </li>
            </ul>
          </div>
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-bold text-gray-900">Contact Me</h2>
            <p className="mt-2 text-gray-600">
              You can contact me at <a href="mailto:you@example.com" className="text-blue-600 hover:underline">mohid10587@gmail.com</a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Portfolio;
