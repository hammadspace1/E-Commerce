// pages/about.js

import Head from 'next/head';

const AboutUs = () => {
  return (
    <div className='mt-16'>
      <Head>
        <title>About Us</title>
        <meta name="description" content="Learn more about our company and mission." />
      </Head>
      <div className="bg-gray-100">
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-extrabold text-center mb-6">About Us</h1>
          <p className="text-lg text-gray-700 text-center mb-12">
            Welcome to <strong>[Your Company Name]</strong>, where we are dedicated to providing the best services to our customers.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-600">
                Our mission is to <em>[describe your mission here, e.g., "deliver high-quality products that improve people's lives."]</em>.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
              <p className="text-gray-600">
                [Insert a brief history about your company. For example, "Founded in 2020, we have quickly grown to become a leader in..."].
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-3xl font-semibold text-center mb-4">Our Values</h2>
            <ul className="list-disc list-inside space-y-2 text-center">
              <li className="text-gray-600">Integrity</li>
              <li className="text-gray-600">Innovation</li>
              <li className="text-gray-600">Customer Focus</li>
              <li className="text-gray-600">Collaboration</li>
            </ul>
          </div>

          <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4">Meet the Team</h2>
            <p className="text-gray-600">
              Our team consists of dedicated professionals who are passionate about <em>[industry/field]</em>.
            </p>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions or would like to learn more about us, please{' '}
              <a href="/contact" className="text-blue-600 hover:underline">
                contact us
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
