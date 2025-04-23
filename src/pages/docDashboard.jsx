import { useState } from "react";
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

const DocDashboard = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
          <div className="h-full w-full">
  <div className="px-4 sm:px-6 py-6">
    <h4 className="text-xl sm:text-2xl font-bold mb-6">
      VDR - Doctor Overview
    </h4>

    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Left/Main Column */}
      <div className="flex-1 w-full">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow mb-6 overflow-x-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b">
            <h3 className="text-base sm:text-lg font-medium">
              Upcoming Appointments
            </h3>
            <div className="text-gray-500 text-sm mt-2 sm:mt-0">
              Recent Patient
            </div>
          </div>

          <div className="divide-y">
            {upcomingAppointments.map((appointment, idx) => (
              <div
                key={idx}
                className="p-4 flex flex-col sm:flex-row justify-between sm:items-center hover:bg-gray-50 gap-2"
              >
                <div>
                  <div className="font-medium">{appointment.name}</div>
                  <div className="text-gray-500 text-sm">
                    {appointment.time}, {appointment.type}
                  </div>
                </div>
                <div className="flex items-center text-sm">
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

        {/* Services by Recent Updates */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <div className="p-4 border-b">
            <h3 className="text-base sm:text-lg font-medium">
              Services by Recent Updates
            </h3>
          </div>

          <div className="divide-y">
            {recentUpdates.map((update, idx) => (
              <div
                key={idx}
                className="p-4 flex flex-col sm:flex-row justify-between sm:items-center hover:bg-gray-50 gap-2"
              >
                <div>
                  <div className="font-medium">{update.name}</div>
                  <div className="text-sm">{update.action}</div>
                </div>
                <div className="text-gray-500 text-sm">
                  {update.date || update.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right/Sidebar Column */}
      <div className="w-full lg:w-80">
        {/* Quick Actions & Notifications */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 border-b">
            <h3 className="text-base sm:text-lg font-medium">
              Quick Actions & Notifications
            </h3>
          </div>

          <div className="p-4">
            <h3 className="font-medium mb-2">Upcoming</h3>
            <div className="flex justify-between items-center mb-4 p-2 hover:bg-gray-50 rounded">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                <span className="text-sm">Today at 3:00 PM</span>
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
                <span className="text-sm">New prescription req</span>
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
                <span className="text-sm">New appointment req</span>
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

        {/* Recent Updates */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h3 className="text-base sm:text-lg font-medium">
              Recent updates
            </h3>
          </div>

          <div className="divide-y">
            <div className="flex justify-between items-center p-4 hover:bg-gray-50">
              <span className="text-sm">Appointment</span>
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
              <span className="text-sm">Pending</span>
              <span className="bg-gray-100 px-2 py-1 rounded text-sm">2</span>
            </div>
            <div className="flex justify-between items-center p-4 hover:bg-gray-50">
              <span className="text-sm">New Requests</span>
              <span className="bg-gray-100 px-2 py-1 rounded text-sm">2</span>
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
          <div className="p-4 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-bold mb-6">Patients</h3>
        
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            {/* Search Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search patients..."
                className="w-full p-2 border rounded"
              />
            </div>
        
            {/* Desktop Table */}
            <div className="hidden md:block">
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
        
            {/* Mobile Card Layout */}
            <div className="md:hidden space-y-4">
              <div className="border rounded-lg p-4 shadow-sm bg-gray-50">
                <div className="mb-2">
                  <span className="font-semibold">Name:</span> John Smith
                </div>
                <div className="mb-2">
                  <span className="font-semibold">ID:</span> P-001
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Last Visit:</span> Apr 04, 2025
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Status:</span>{" "}
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                    Active
                  </span>
                </div>
                <div>
                  <button className="text-blue-500 font-medium">View</button>
                </div>
              </div>
        
              <div className="border rounded-lg p-4 shadow-sm bg-gray-50">
                <div className="mb-2">
                  <span className="font-semibold">Name:</span> Mary Johnson
                </div>
                <div className="mb-2">
                  <span className="font-semibold">ID:</span> P-002
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Last Visit:</span> Apr 24, 2025
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Status:</span>{" "}
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                    Active
                  </span>
                </div>
                <div>
                  <button className="text-blue-500 font-medium">View</button>
                </div>
              </div>
        
              <div className="border rounded-lg p-4 shadow-sm bg-gray-50">
                <div className="mb-2">
                  <span className="font-semibold">Name:</span> James Williams
                </div>
                <div className="mb-2">
                  <span className="font-semibold">ID:</span> P-003
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Last Visit:</span> Apr 19, 2025
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Status:</span>{" "}
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                    Pending
                  </span>
                </div>
                <div>
                  <button className="text-blue-500 font-medium">View</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        );  
      case "Prescriptions":
        return (
          <div className="p-4 sm:p-6">
  <h3 className="text-xl sm:text-2xl font-bold mb-6">Prescriptions</h3>

  <div className="bg-white rounded-lg shadow p-4 sm:p-6">
    {/* Header: Search + Button */}
    <div className="mb-4 flex flex-col sm:flex-row sm:justify-between gap-3">
      <input
        type="text"
        placeholder="Search prescriptions..."
        className="w-full sm:w-64 p-2 border rounded"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        New Prescription
      </button>
    </div>

    {/* Desktop Table */}
    <div className="hidden md:block">
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

    {/* Mobile Cards */}
    <div className="md:hidden space-y-4">
      <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
        <div className="mb-1">
          <span className="font-semibold">Patient:</span> John Smith
        </div>
        <div className="mb-1">
          <span className="font-semibold">Medication:</span> Amoxicillin
        </div>
        <div className="mb-1">
          <span className="font-semibold">Dosage:</span> 500mg, 3x daily
        </div>
        <div className="mb-1">
          <span className="font-semibold">Created:</span> Apr 04, 2025
        </div>
        <div>
          <span className="font-semibold">Status:</span>{" "}
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
            Active
          </span>
        </div>
      </div>

      <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
        <div className="mb-1">
          <span className="font-semibold">Patient:</span> Mary Johnson
        </div>
        <div className="mb-1">
          <span className="font-semibold">Medication:</span> Lisinopril
        </div>
        <div className="mb-1">
          <span className="font-semibold">Dosage:</span> 10mg, daily
        </div>
        <div className="mb-1">
          <span className="font-semibold">Created:</span> Apr 24, 2025
        </div>
        <div>
          <span className="font-semibold">Status:</span>{" "}
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
            Active
          </span>
        </div>
      </div>
    </div>
  </div>
</div>

        );
      case "Teleconsultations":
        return (
          <div className="p-4 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 ">Teleconsultations</h3>
        
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Upcoming Sessions */}
            <div className="bg-white rounded-lg shadow p-4 sm:p-6 flex-1">
              <h2 className="text-lg font-medium mb-4">Upcoming Sessions</h2>
              <div className="divide-y">
                <div className="py-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div>
                      <div className="font-medium">John Smith</div>
                      <div className="text-sm text-gray-500">04 Apr. at 9:40</div>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 sm:px-3 sm:py-1 rounded text-sm w-full sm:w-auto">
                      Join
                    </button>
                  </div>
                </div>
                <div className="py-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div>
                      <div className="font-medium">Mary Johnson</div>
                      <div className="text-sm text-gray-500">24 Apr. at 2:45</div>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 sm:px-3 sm:py-1 rounded text-sm w-full sm:w-auto">
                      Join
                    </button>
                  </div>
                </div>
              </div>
            </div>
        
            {/* Past Sessions */}
            <div className="bg-white rounded-lg shadow p-4 sm:p-6 flex-1">
              <h2 className="text-lg font-medium mb-4">Past Sessions</h2>
              <div className="divide-y">
                <div className="py-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div>
                      <div className="font-medium">James Williams</div>
                      <div className="text-sm text-gray-500">19 Apr. at 2:05</div>
                    </div>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 sm:px-3 sm:py-1 rounded text-sm w-full sm:w-auto">
                      View Notes
                    </button>
                  </div>
                </div>
                <div className="py-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div>
                      <div className="font-medium">Patricia Brown</div>
                      <div className="text-sm text-gray-500">15 Apr. at 11:30</div>
                    </div>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 sm:px-3 sm:py-1 rounded text-sm w-full sm:w-auto">
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
          <div className="p-4 sm:p-6">
  <h4 className="text-xl sm:text-2xl font-bold mb-6">Appointments</h4>

  <div className="flex flex-col gap-6 lg:flex-row">
    <div className="bg-white rounded-lg shadow p-4 sm:p-6 flex-1">
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-lg font-medium">Upcoming Appointments</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto">
          New Appointment
        </button>
      </div>

      {/* Table for larger screens */}
      <div className="hidden sm:block">
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
            {[
              {
                name: "John Smith",
                date: "Apr 04, 2025 - 9:40 AM",
                type: "Check-up",
                status: "Confirmed",
                statusClass: "bg-green-100 text-green-800",
              },
              {
                name: "Mary Johnson",
                date: "Apr 24, 2025 - 2:45 PM",
                type: "Prescription",
                status: "Pending",
                statusClass: "bg-yellow-100 text-yellow-800",
              },
              {
                name: "James Williams",
                date: "Apr 19, 2025 - 2:05 PM",
                type: "Follow-up",
                status: "Confirmed",
                statusClass: "bg-green-100 text-green-800",
              },
            ].map((appt, idx) => (
              <tr key={idx}>
                <td className="p-3">{appt.name}</td>
                <td className="p-3">{appt.date}</td>
                <td className="p-3">{appt.type}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${appt.statusClass}`}
                  >
                    {appt.status}
                  </span>
                </td>
                <td className="p-3">
                  <button className="text-blue-500 mr-2">Edit</button>
                  <button className="text-neutral-900">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stacked layout for mobile */}
      <div className="sm:hidden flex flex-col gap-4">
        {[
          {
            name: "John Smith",
            date: "Apr 04, 2025 - 9:40 AM",
            type: "Check-up",
            status: "Confirmed",
            statusClass: "bg-green-100 text-green-800",
          },
          {
            name: "Mary Johnson",
            date: "Apr 24, 2025 - 2:45 PM",
            type: "Prescription",
            status: "Pending",
            statusClass: "bg-yellow-100 text-yellow-800",
          },
          {
            name: "James Williams",
            date: "Apr 19, 2025 - 2:05 PM",
            type: "Follow-up",
            status: "Confirmed",
            statusClass: "bg-green-100 text-green-800",
          },
        ].map((appt, idx) => (
          <div
            key={idx}
            className="border rounded p-4 shadow-sm bg-gray-50 flex flex-col gap-2"
          >
            <div>
              <span className="font-semibold">Patient:</span> {appt.name}
            </div>
            <div>
              <span className="font-semibold">Date & Time:</span> {appt.date}
            </div>
            <div>
              <span className="font-semibold">Type:</span> {appt.type}
            </div>
            <div>
              <span className="font-semibold">Status:</span>{" "}
              <span className={`px-2 py-1 rounded text-sm ${appt.statusClass}`}>
                {appt.status}
              </span>
            </div>
            <div className="flex gap-2 mt-2">
              <button className="text-blue-500 w-full">Edit</button>
              <button className="text-neutral-900 w-full">Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

        );

      case "Profile":
        return (
          <div className="p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Doctor Profile</h1>
          <div className="bg-white rounded-lg shadow">
            
            {/* Header Section */}
            <div className="p-4 sm:p-6 border-b">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="bg-gray-200 rounded-full w-24 h-24 flex items-center justify-center">
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
                <div className="text-center sm:text-left">
                  <h2 className="text-lg sm:text-xl font-bold">Dr. Sarah Reynolds</h2>
                  <p className="text-gray-600">General Practitioner</p>
                  <p className="text-gray-600">License #: MD12345</p>
                </div>
                <div className="sm:ml-auto mt-2 sm:mt-0">
                  <button className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
        
            {/* Personal Information */}
            <div className="p-4 sm:p-6">
              <h3 className="text-lg font-medium mb-3 sm:mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        
            {/* Schedule */}
            <div className="p-4 sm:p-6 border-t">
              <h3 className="text-lg font-medium mb-3 sm:mb-4">Schedule & Availability</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
        
            {/* Account Settings */}
            <div className="p-4 sm:p-6 border-t">
              <h3 className="text-lg font-medium mb-3 sm:mb-4">Account Settings</h3>
              <div className="space-y-3">
                <button className="block text-blue-600">Change Password</button>
                <button className="block text-blue-600">Notification Preferences</button>
                <button className="block text-blue-600">Two-Factor Authentication</button>
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
    <div className="flex h-screen bg-white">
  {/* Sidebar */}
  <div
    className={`
      bg-white shadow-lg flex flex-col transition-all duration-300
      ${isSidebarOpen ? "w-40" : "w-12 sm:w-60"}
      h-full
    `}
  >
    {/* Sidebar Header */}
    <div className="p-4 border-b flex items-center justify-between sm:justify-start cursor-pointer bg-red-200  ">
      <span onClick={toggleSidebar} className="cursor-pointer sm:inline block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 bg-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </span>

        <div className="flex items-center sm:block hidden ">
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
          </svg>
  
        </div>
      </div>

      {/* Menu Items */}
      <nav className="py-4 ">
        <ul>
        {menuItems.map((item) => (
  <li key={item.name}>
    <button
      onClick={() => {
        setActivePage(item.name); 
        if (window.innerWidth < 640) {
          setIsSidebarOpen(false); 
        }
      }}
      className={`group flex items-center px-2 py-3 w-full text-left transition-all duration-200 ${
        activePage === item.name
          ? "bg-white text-blue-600 border-r-4 border-blue-600"
          : "bg-white bg-white"
      }`}
    >
      <span className="mr-3 group-hover:text-blue-600 group-hover:scale-110">
        {item.icon}
      </span>
      <span
        className={`transition-all group-hover:text-blue-600 ${
          !isSidebarOpen && "hidden sm:inline"
        }`}
      >
        {item.name}
      </span>
    </button>
  </li>
))}

        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-auto border-t text-neutral-900">
        <button
          onClick={() => setActivePage("Profile")}
          className={`group flex items-center px-4 py-3 w-full text-left transition-all duration-200 ${
            activePage === "Profile"
              ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
              : "bg-white hover:bg-white"
          }`}
        >
          <span className="mr-0 sm:mr-3 transition-all duration-200 group-hover:text-blue-600 group-hover:scale-110">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </span>
          <span
            className={`hidden sm:inline transition-colors duration-200 group-hover:text-blue-600 ${!isSidebarOpen && "hidden"}`}
          >
            Profile
          </span>
        </button>

        <button
          onClick={() => alert("Logged out successfully")}
          className="group flex items-center px-4 py-3 w-full text-left text-black hover:bg-gray-100 transition-all duration-200"
        >
          <span className="mr-0 sm:mr-3 transition-all duration-200 group-hover:text-red-600 group-hover:scale-110">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </span>
          <span
            className={`hidden sm:inline transition-colors duration-200 group-hover:text-red-600 ${!isSidebarOpen && "hidden"}`}
          >
            Logout
          </span>
        </button>
      </div>
    </div>

    {/* Main content */}
    <div className="flex-1 overflow-auto">{renderContent()}</div>
  </div>

  );
};

export default DocDashboard;

//Tailwind css
