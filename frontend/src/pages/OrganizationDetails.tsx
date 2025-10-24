import { useState } from 'react';
import UserList from '../components/UserList';
import { Tab } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function OrganizationDetails() {
  const [tabs] = useState(['Basic details', 'Users']);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/64"
              alt="Organization logo"
              className="h-16 w-16 rounded-lg"
            />
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">GITAM Institute of Technology</h1>
              <div className="mt-1 flex items-center space-x-4">
                <span className="text-sm text-gray-500">gitam@gitam.in</span>
                <span className="text-sm text-gray-500">91 - 9676456543</span>
                <a
                  href="https://gitam.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:text-indigo-900"
                >
                  Gitam.edu
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
              Active
            </span>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-900">
              Change status
            </button>
          </div>
        </div>
      </div>

      <Tab.Group>
        <Tab.List className="flex space-x-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                classNames(
                  'border-b-2 py-4 px-1 text-sm font-medium',
                  selected
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-8">
          <Tab.Panel>
            <div className="space-y-8">
              {/* Basic details content will go here */}
              <p>Basic details content</p>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Users</h2>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Add user
              </button>
            </div>
            <UserList />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}