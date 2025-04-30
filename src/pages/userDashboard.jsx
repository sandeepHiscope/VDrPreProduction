import { useState } from 'react';
import { Menu, X,User,LogOut, Calendar, FileText, Pill, Bell, ChevronRight, Download, Clock } from 'lucide-react';
import Mohan from "../assets/Images/foundersImg/mohan.jpg";
import "./userDashboard.css";


export default function PatientDashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('consultation');
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'consultation':
        return <ConsultationSection />;
      case 'diagnosis':
        return <DiagnosisSection />;
      case 'prescription':
        return <PrescriptionSection />;
      case 'notification':
        return <NotificationSection />;
        case 'profile':
        return <ProfileSection />;
      case 'logout':
        return <LogoutPopup show={showLogoutPopup} onConfirm={handleLogout} onCancel={handleCancelLogout} />;
      default:
        return <ConsultationSection />;
    }
  };
  const handleLogout = () => {
    setShowLogoutPopup(false);
    alert("Logged out successfully");
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-4 flex justify-between items-center border-b">
          {isOpen && <h2 className="font-bold text-blue-800">UserPortal</h2>}
          <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-gray-200">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <div className="py-4 flex flex-col ">
          <NavItem 
            icon={<Calendar />} 
            title="Consultation" 
            isOpen={isOpen} 
            isActive={activeTab === 'consultation'} 
            onClick={() => setActiveTab('consultation')} 
          />
          <NavItem 
            icon={<FileText />} 
            title="Diagnosis Reports" 
            isOpen={isOpen} 
            isActive={activeTab === 'diagnosis'} 
            onClick={() => setActiveTab('diagnosis')} 
          />
          <NavItem 
            icon={<Pill />} 
            title="Prescriptions" 
            isOpen={isOpen} 
            isActive={activeTab === 'prescription'} 
            onClick={() => setActiveTab('prescription')} 
          />
          <NavItem 
            icon={<Bell />} 
            title="Notifications" 
            isOpen={isOpen} 
            isActive={activeTab === 'notification'} 
            onClick={() => setActiveTab('notification')} 
          />
          <NavItem 
            icon={<User />} 
            title="Profile" 
            isOpen={isOpen} 
            isActive={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')} 
            className="bg-amber-600"
          />

            <NavItem 
            icon={<LogOut />} 
            title="Logout" 
            isOpen={isOpen} 
            isActive={activeTab === 'logout'} 
            onClick={() => setShowLogoutPopup(true)} 
          />

         
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto ">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Patient Dashboard</h1>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
function ProfileSection() {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <img src={Mohan} alt="Patient" className="w-20 h-20 rounded-full mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Mohan Kumar</h3>
            <p className="text-gray-600">Age: 30</p>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-medium text-gray-800 mb-2">Personal Information</h4>
          <ul className="space-y-2 text-gray-600">
            <li>Email: mohan.kumar@example.com</li>
            <li>Phone: +123 456 7890</li>
            <li>Address: 123, Main Street, City, Country</li>
          </ul>
        </div>
        <button className="mt-4 text-blue-600 hover:text-blue-800">Change Settings</button>
      </div>
    );
  }
  

function NavItem({ icon, title, isOpen, isActive, onClick }) {
  return (
    <div 
      className={`flex items-center px-4 py-3 cursor-pointer transition-colors ${isActive ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
      onClick={onClick}
    >
      <div className="text-xl">{icon}</div>
      {isOpen && <span className="ml-4 text-sm font-medium">{title}</span>}
    </div>
  );
}

function ConsultationCard({ date, time, patient, status, type }) {
  const statusColors = {
    completed: 'bg-green-100 text-green-800',
    upcoming: 'bg-blue-100 text-blue-800',
    scheduled: 'bg-yellow-100 text-yellow-800'
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{patient}</h3>
          <div className="flex items-center text-gray-600 text-sm mt-1">
            <Clock size={14} className="mr-1" />
            <span>{date} at {time}</span>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3">
        {type === 'video' ? 'Video Consultation' : 'In-person Appointment'}
      </p>
      <button className="text-blue-600 text-sm font-medium flex items-center hover:text-blue-800">
        View Details <ChevronRight size={16} />
      </button>
    </div>
  );
}

function ConsultationSection() {
  const [activeFilter, setActiveFilter] = useState('upcoming');
  
  const consultations = {
    past: [
      { id: 1, patient: 'John Doe', date: '15 Apr 2025', time: '10:30 AM', status: 'completed', type: 'video' },
      { id: 2, patient: 'Sarah Smith', date: '10 Apr 2025', time: '2:00 PM', status: 'completed', type: 'in-person' }
    ],
    upcoming: [
      { id: 3, patient: 'Robert Johnson', date: '30 Apr 2025', time: '9:15 AM', status: 'upcoming', type: 'video' },
      { id: 4, patient: 'Emily Wilson', date: '2 May 2025', time: '11:00 AM', status: 'upcoming', type: 'in-person' }
    ],
    scheduled: [
      { id: 5, patient: 'Michael Brown', date: '10 May 2025', time: '3:30 PM', status: 'scheduled', type: 'video' },
      { id: 6, patient: 'Jessica Taylor', date: '15 May 2025', time: '1:45 PM', status: 'scheduled', type: 'in-person' }
    ]
  };
  
  return (
    <div>
      <div className="flex space-x-4 mb-6">
        <button 
          className={`px-4 py-2 rounded-lg text-sm font-medium ${activeFilter === 'past' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveFilter('past')}
        >
          Past
        </button>
        <button 
          className={`px-4 py-2 rounded-lg text-sm font-medium ${activeFilter === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveFilter('upcoming')}
        >
          Upcoming
        </button>
        <button 
          className={`px-4 py-2 rounded-lg text-sm font-medium ${activeFilter === 'scheduled' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveFilter('scheduled')}
        >
          Scheduled
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {consultations[activeFilter].map(consultation => (
          <ConsultationCard key={consultation.id} {...consultation} />
        ))}
      </div>
    </div>
  );
}

function DiagnosisSection() {
  const reports = [
    { id: 1, name: 'Blood Test Report', date: '15 Apr 2025', type: 'PDF', size: '2.3 MB' },
    { id: 2, name: 'X-Ray Results', date: '10 Apr 2025', type: 'DICOM', size: '8.7 MB' },
    { id: 3, name: 'MRI Scan Report', date: '5 Apr 2025', type: 'PDF', size: '4.1 MB' },
    { id: 4, name: 'ECG Results', date: '1 Apr 2025', type: 'PDF', size: '1.8 MB' }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Diagnosis Reports</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.map(report => (
              <tr key={report.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.size}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 flex items-center">
                    <Download size={16} className="mr-1" /> Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PrescriptionSection() {
  const [activeFilter, setActiveFilter] = useState('current');
  
  const prescriptions = {
    current: [
      { id: 1, name: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily', duration: '7 days', notes: 'Take with food' },
      { id: 2, name: 'Ibuprofen', dosage: '400mg', frequency: 'Every 6 hours as needed', duration: '5 days', notes: 'For pain and inflammation' }
    ],
    past: [
      { id: 3, name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily', duration: '14 days', notes: 'For allergic rhinitis' },
      { id: 4, name: 'Omeprazole', dosage: '20mg', frequency: 'Once daily before breakfast', duration: '30 days', notes: 'For acid reflux' }
    ]
  };
  
  return (
    <div>
      <div className="flex space-x-4 mb-6">
        <button 
          className={`px-4 py-2 rounded-lg text-sm font-medium ${activeFilter === 'current' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveFilter('current')}
        >
          Current
        </button>
        <button 
          className={`px-4 py-2 rounded-lg text-sm font-medium ${activeFilter === 'past' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveFilter('past')}
        >
          Past
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md">
        {prescriptions[activeFilter].map(prescription => (
          <div key={prescription.id} className="p-4 border-b last:border-b-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{prescription.name}</h3>
                <p className="text-gray-600 mt-1">{prescription.dosage} - {prescription.frequency}</p>
                <p className="text-gray-600">Duration: {prescription.duration}</p>
                <p className="text-gray-500 text-sm mt-2">{prescription.notes}</p>
              </div>
              <button className="text-blue-600 text-sm font-medium flex items-center hover:text-blue-800">
                View Details <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationSection() {
  const notifications = [
    { id: 1, type: 'appointment', message: 'Upcoming appointment with Robert Johnson tomorrow at 9:15 AM', time: '2 hours ago' },
    { id: 2, type: 'report', message: 'New lab results available for Emily Wilson', time: '5 hours ago' },
    { id: 3, type: 'reminder', message: 'Don\'t forget to review Michael Brown\'s prescription', time: '1 day ago' },
    { id: 4, type: 'appointment', message: 'Jessica Taylor rescheduled appointment to May 15th at 1:45 PM', time: '2 days ago' }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
      </div>
      <div>
        {notifications.map(notification => {
          let icon;
          let bgColor;
          
          switch (notification.type) {
            case 'appointment':
              icon = <Calendar size={20} />;
              bgColor = 'bg-blue-100';
              break;
            case 'report':
              icon = <FileText size={20} />;
              bgColor = 'bg-green-100';
              break;
            case 'reminder':
              icon = <Bell size={20} />;
              bgColor = 'bg-yellow-100';
              break;
            default:
              icon = <Bell size={20} />;
              bgColor = 'bg-gray-100';
          }
          
          return (
            <div key={notification.id} className="p-4 border-b last:border-b-0 hover:bg-gray-50">
              <div className="flex">
                <div className={`${bgColor} p-3 rounded-full mr-4`}>
                  {icon}
                </div>
                <div>
                  <p className="text-gray-800">{notification.message}</p>
                  <p className="text-gray-500 text-sm mt-1">{notification.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}