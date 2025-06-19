import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import {
  Mail, Phone, MapPin, PencilLine, ShoppingBag, LogOut, KeyRound, BookOpenText, ChevronDown, ChevronUp
} from 'lucide-react';
import toast from 'react-hot-toast';

function ProfilePage() {
  const { user,setUser,axios,navigate } = useAppContext();
  const [faqOpen, setFaqOpen] = useState(null);
  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Please log in to view your profile.
      </div>
    );
  }

  const faqs = [
    {
      question: "How can I change my password?",
      answer: "Go to 'Change Password' from the options below and follow the steps."
    },
    {
      question: "How do I update my shipping address?",
      answer: "Click on 'Address Book' and you can edit or add new addresses."
    },
    {
      question: "Where can I see my past orders?",
      answer: "Click 'View My Orders' to see your order history."
    }
  ];
  const logout = async () => {
    try {
      const { data } = await axios.get('/api/user/logout');
      if (data.success) {
        setUser(null);
        navigate('/');
        toast.success(data.message);
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      toast.success(error.message);
    }
  }

  return (
    <div className="px-4 md:px-10 py-10 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6 md:p-10 border border-gray-200">
        {/* User Avatar and Basic Info */}
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-4xl font-bold mb-4 shadow">
            {user.name?.[0]?.toUpperCase() || "U"}
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-500 text-sm">Welcome back 👋</p>
        </div>

        {/* Contact Details */}
        <div className="mt-8 space-y-4 text-gray-700">
          <div className="flex items-center gap-3">
            <Mail size={18} />
            <span>{user.email}</span>
          </div>

          {user.phone && (
            <div className="flex items-center gap-3">
              <Phone size={18} />
              <span>{user.phone}</span>
            </div>
          )}

          {user.address && (
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-1" />
              <span>
                {user.address.street}, {user.address.city}, {user.address.state} - {user.address.zipcode}
              </span>
            </div>
          )}
        </div>

        {/* Primary Actions */}
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <button
            onClick={() => navigate('/user/edit-profile')}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-indigo-500 text-indigo-500 rounded-lg hover:bg-indigo-50 transition"
          >
            <PencilLine size={18} />
            Edit Profile
          </button>

          <button
            onClick={() => navigate('/user/order')}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          >
            <ShoppingBag size={18} />
            View My Orders
          </button>
        </div>

        {/* Secondary Options */}
        <div className="mt-10 space-y-4">
          <OptionItem icon={BookOpenText} text="Address Book" onClick={() => navigate('/user/address-book')} />
          <OptionItem icon={KeyRound} text="Change Password" onClick={() => navigate('/user/change-password')} />
          <div className='text-red-400'>
            <OptionItem icon={LogOut} text="Logout" onClick={logout} />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-md p-4 bg-white shadow-sm">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                >
                  <p className="font-medium text-gray-800">{faq.question}</p>
                  {faqOpen === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                {faqOpen === index && (
                  <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function OptionItem({ icon: Icon, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-gray-700"
    >
      <Icon size={20} />
      {text}
    </button>
  );
}

export default ProfilePage;