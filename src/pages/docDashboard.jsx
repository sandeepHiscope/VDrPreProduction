import React, { useState } from "react";
import {
  Calendar,
  Clock,
  FileText,
  Users,
  Clipboard,
  Video,
  Shield,
  Bell,
} from "lucide-react";
import "./docDashboard.css"

const DocDashboard = () => {
  // State to track active page
  const [activePage, setActivePage] = useState("Dashboard");

  // Menu items for sidebar
  const menuItems = [
    { name: "Dashboard", icon: <Calendar className="w-5 h-5 text-neutral-900" /> },
    { name: "Appointments", icon: <Clock className="w-5 h-5  text-neutral-900" /> },
    { name: "Patients", icon: <Users className="w-5 h-5  text-neutral-900" /> },
    { name: "Prescriptions", icon: <Clipboard className="w-5 h-5  text-neutral-900" /> },
    { name: "Teleconsultations", icon: <Video className="w-5 h-5  text-neutral-900" /> },
    { name: "Services", icon: <FileText className="w-5 h-5  text-neutral-900" /> },
    { name: "Insurance", icon: <Shield className="w-5 h-5  text-neutral-900" /> },
    { name: "SOS Alerts", icon: <Bell className="w-5 h-5  text-neutral-900" /> },
  ];

  // Mock data for the dashboard
  const upcomingAppointments = [
    {
      name: "John Smith",
      time: "5:30 am",
      type: "patient",
      date: "04 apr. at 9:40",
    },
    {
      name: "Mary Johnson",
      time: "5:30 am",
      type: "prescription",
      date: "24 apr. at 2:45",
    },
    {
      name: "James Williams",
      time: "5:30 am",
      type: "insurance",
      date: "19 apr. at 2:05",
    },
  ];

  const recentUpdates = [
    {
      name: "John Smith",
      action: "New prescription created",
      date: "May at 9:50 PM",
    },
    { name: "James Williams", action: "Completed teleconsultation", date: "" },
    { name: "Patricia Brown", action: "Resolved SOS alert", date: "" },
  ];

  // Function to render different pages based on active state
  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return (
          <div className="h-full">
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-6">VDR - Doctor Overview</h1>

              <div className="flex gap-6 flex-col lg:flex-row">
                <div className="flex-1">
                  <div className="bg-white rounded-lg shadow mb-6">
                    <div className="flex justify-between items-center p-4 border-b">
                      <h2 className="text-lg font-medium">
                        Upcoming Appointments
                      </h2>
                      <div className="text-gray-500">Recent Patient</div>
                    </div>

                    <div className="divide-y">
                      {upcomingAppointments.map((appointment, idx) => (
                        <div
                          key={idx}
                          className="p-4 flex justify-between items-center hover:bg-gray-50"
                        >
                          <div>
                            <div className="font-medium">
                              {appointment.name}
                            </div>
                            <div className="text-gray-500 text-sm">
                              {appointment.time}, {appointment.type}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="mr-2">{appointment.date}</span>
                            <svg
                              className="w-5 h-5 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow">
                    <div className="p-4 border-b">
                      <h2 className="text-lg font-medium">
                        Services by Recent Updates
                      </h2>
                    </div>

                    <div className="divide-y">
                      {recentUpdates.map((update, idx) => (
                        <div
                          key={idx}
                          className="p-4 flex justify-between items-center hover:bg-gray-50"
                        >
                          <div>
                            <div className="font-medium">{update.name}</div>
                            <div className="text-sm">{update.action}</div>
                          </div>
                          <div className="text-gray-500">
                            {update.date || update.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-80">
                  <div className="bg-white rounded-lg shadow mb-6">
                    <div className="p-4 border-b">
                      <h2 className="text-lg font-medium">
                        Quick Actions & Notifications
                      </h2>
                    </div>

                    <div className="p-4">
                      <h3 className="font-medium mb-2">Upcoming</h3>
                      <div className="flex justify-between items-center mb-4 p-2 hover:bg-gray-50 rounded">
                        <div className="flex items-center">
                          <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                          <span>Today at 3:00 PM</span>
                        </div>
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>

                      <h3 className="font-medium mb-2">Pending</h3>
                      <div className="flex justify-between items-center mb-4 p-2 hover:bg-gray-50 rounded">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 mr-2 text-gray-500" />
                          <span>New prescription req</span>
                        </div>
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>

                      <h3 className="font-medium mb-2">New Requests</h3>
                      <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 mr-2 text-gray-500" />
                          <span>New appointment req</span>
                        </div>
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow">
                    <div className="p-4 border-b">
                      <h2 className="text-lg font-medium">Recent updates</h2>
                    </div>

                    <div className="divide-y">
                      <div className="flex justify-between items-center p-4 hover:bg-gray-50">
                        <span>Appointment</span>
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-between items-center p-4 hover:bg-gray-50">
                        <span>Pending</span>
                        <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                          2
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-4 hover:bg-gray-50">
                        <span>New Requests</span>
                        <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                          2
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "Patients":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Patients</h1>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="w-full p-2 border rounded"
                />
              </div>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Last Visit</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-3">John Smith</td>
                    <td className="p-3">P-001</td>
                    <td className="p-3">Apr 04, 2025</td>
                    <td className="p-3">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        Active
                      </span>
                    </td>
                    <td className="p-3">
                      <button className="text-blue-500">View</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3">Mary Johnson</td>
                    <td className="p-3">P-002</td>
                    <td className="p-3">Apr 24, 2025</td>
                    <td className="p-3">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        Active
                      </span>
                    </td>
                    <td className="p-3">
                      <button className="text-blue-500">View</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3">James Williams</td>
                    <td className="p-3">P-003</td>
                    <td className="p-3">Apr 19, 2025</td>
                    <td className="p-3">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                        Pending
                      </span>
                    </td>
                    <td className="p-3">
                      <button className="text-blue-500">View</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case "Prescriptions":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Prescriptions</h1>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-4 flex justify-between">
                <input
                  type="text"
                  placeholder="Search prescriptions..."
                  className="w-64 p-2 border rounded"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  New Prescription
                </button>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left">Patient</th>
                    <th className="p-3 text-left">Medication</th>
                    <th className="p-3 text-left">Dosage</th>
                    <th className="p-3 text-left">Created</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-3">John Smith</td>
                    <td className="p-3">Amoxicillin</td>
                    <td className="p-3">500mg, 3x daily</td>
                    <td className="p-3">Apr 04, 2025</td>
                    <td className="p-3">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        Active
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3">Mary Johnson</td>
                    <td className="p-3">Lisinopril</td>
                    <td className="p-3">10mg, daily</td>
                    <td className="p-3">Apr 24, 2025</td>
                    <td className="p-3">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        Active
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case "Teleconsultations":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Teleconsultations</h1>
            <div className="flex gap-6 flex-col lg:flex-row">
              <div className="bg-white rounded-lg shadow p-6 flex-1">
                <h2 className="text-lg font-medium mb-4">Upcoming Sessions</h2>
                <div className="divide-y">
                  <div className="py-3">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">John Smith</div>
                        <div className="text-sm text-gray-500">
                          04 apr. at 9:40
                        </div>
                      </div>
                      <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                        Join
                      </button>
                    </div>
                  </div>
                  <div className="py-3">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">Mary Johnson</div>
                        <div className="text-sm text-gray-500">
                          24 apr. at 2:45
                        </div>
                      </div>
                      <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 flex-1">
                <h2 className="text-lg font-medium mb-4">Past Sessions</h2>
                <div className="divide-y">
                  <div className="py-3">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">James Williams</div>
                        <div className="text-sm text-gray-500">
                          19 apr. at 2:05
                        </div>
                      </div>
                      <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">
                        View Notes
                      </button>
                    </div>
                  </div>
                  <div className="py-3">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">Patricia Brown</div>
                        <div className="text-sm text-gray-500">
                          15 apr. at 11:30
                        </div>
                      </div>
                      <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">
                        View Notes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "Appointments":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Appointments</h1>
            <div className="flex gap-6 flex-col lg:flex-row">
              <div className="bg-white rounded-lg shadow p-6 flex-1">
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-lg font-medium">Upcoming Appointments</h2>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    New Appointment
                  </button>
                </div>
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-left">Patient</th>
                      <th className="p-3 text-left">Date & Time</th>
                      <th className="p-3 text-left">Type</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-3">John Smith</td>
                      <td className="p-3">Apr 04, 2025 - 9:40 AM</td>
                      <td className="p-3">Check-up</td>
                      <td className="p-3">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                          Confirmed
                        </span>
                      </td>
                      <td className="p-3">
                        <button className="text-blue-500 mr-2">Edit</button>
                        <button className="text-neutral-900">Cancel</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3">Mary Johnson</td>
                      <td className="p-3">Apr 24, 2025 - 2:45 PM</td>
                      <td className="p-3">Prescription</td>
                      <td className="p-3">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                          Pending
                        </span>
                      </td>
                      <td className="p-3">
                        <button className="text-blue-500 mr-2">Edit</button>
                        <button className="text-neutral-900">Cancel</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3">James Williams</td>
                      <td className="p-3">Apr 19, 2025 - 2:05 PM</td>
                      <td className="p-3">Follow-up</td>
                      <td className="p-3">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                          Confirmed
                        </span>
                      </td>
                      <td className="p-3">
                        <button className="text-blue-500 mr-2">Edit</button>
                        <button className="text-neutral-900">Cancel</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "Profile":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Doctor Profile</h1>
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex items-center">
                  <div className="bg-gray-200 rounded-full w-24 h-24 flex items-center justify-center mr-6">
                    <svg
                      className="w-12 h-12 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Dr. Sarah Reynolds</h2>
                    <p className="text-gray-600">General Practitioner</p>
                    <p className="text-gray-600">License #: MD12345</p>
                  </div>
                  <button className="ml-auto bg-blue-500 text-white px-4 py-2 rounded">
                    Edit Profile
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <p>dr.reynolds@example.com</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Phone</p>
                    <p>+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Address</p>
                    <p>123 Medical Center Drive, Suite 456</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Specialization</p>
                    <p>Family Medicine</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t">
                <h3 className="text-lg font-medium mb-4">
                  Schedule & Availability
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="font-medium">Monday - Friday</p>
                    <p className="text-gray-600">9:00 AM - 5:00 PM</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="font-medium">Saturday</p>
                    <p className="text-gray-600">10:00 AM - 2:00 PM</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="font-medium">Sunday</p>
                    <p className="text-gray-600">Closed</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t">
                <h3 className="text-lg font-medium mb-4">Account Settings</h3>
                <div className="space-y-3">
                  <button className="block text-blue-600">
                    Change Password
                  </button>
                  <button className="block text-blue-600">
                    Notification Preferences
                  </button>
                  <button className="block text-blue-600">
                    Two-Factor Authentication
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-xl font-medium mb-2">{activePage}</h2>
              <p className="text-gray-500">This page is under development</p>
            </div>
          </div>
        );
    }
  };

  return (
    // {sidepanel}
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 bg-white shadow-lg flex flex-col h-full">
        <div className="p-4 border-b flex items-center">
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
          <span className="font-bold text-lg">Doctor</span>
        </div>
        <nav className="py-4 flex-grow">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => setActivePage(item.name)}
                  className={`flex items-center px-4 py-3 w-full text-left  text-neutral-900 ${
                    activePage === item.name
                      ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto border-t  text-neutral-900">
          <button
            onClick={() => setActivePage("Profile")}
            className={`flex items-center px-4 py-3 w-full text-left  text-neutral-900 ${
              activePage === "Profile"
                ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span className="mr-3">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
            <span className=" text-neutral-900">Profile</span>
          </button>
          <button
            onClick={() => alert("Logged out successfully")}
            className="flex items-center px-4 py-3 w-full text-left text-black hover:bg-gray-100"
          >
            <span className="mr-3">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">{renderContent()}</div>
    </div>
  );
};

export default DocDashboard;

//Tailwind css
