import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Book, Play, Award, Clock, Plus, FileText } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  status: 'not-started' | 'in-progress' | 'completed';
  progress: number;
  dueDate: string;
}

function TrainingPage() {
  const { data: courses } = useQuery({
    queryKey: ['training-courses'],
    queryFn: async () => {
      // Simulated API call
      return [
        {
          id: '1',
          title: 'React Advanced Patterns',
          description: 'Learn advanced React patterns and best practices',
          duration: '8 hours',
          category: 'Technical',
          status: 'in-progress',
          progress: 60,
          dueDate: '2024-04-30',
        },
        {
          id: '2',
          title: 'Leadership Skills',
          description: 'Essential leadership skills for managers',
          duration: '12 hours',
          category: 'Soft Skills',
          status: 'not-started',
          progress: 0,
          dueDate: '2024-05-15',
        },
      ] as Course[];
    },
  });

  const CourseCard = ({ course }: { course: Course }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{course.description}</p>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            course.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : course.status === 'in-progress'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {course.status.replace('-', ' ')}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-2" />
          {course.duration}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Book className="h-4 w-4 mr-2" />
          {course.category}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Progress</span>
          <span>{course.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">Due: {course.dueDate}</span>
        <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          <Play className="h-4 w-4 mr-1" />
          {course.status === 'not-started' ? 'Start Course' : 'Continue'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Training & Development
        </h1>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <FileText className="h-4 w-4 mr-2" />
            My Certificates
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Request Training
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100">
                  <Book className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Active Courses
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">3</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Completed Courses
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">12</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Learning Hours
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">48</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {courses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default TrainingPage;