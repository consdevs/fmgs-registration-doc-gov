import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import { isSupabaseConfigured } from '../services/supabase';

function SignupPage() {
  const navigate = useNavigate();
  const { signUp, isLoading, error, clearError } = useAuthStore();

  const [step, setStep] = useState(1); // 1: Form, 2: OTP Sent
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
  });

  const [errors, setErrors] = useState({});

  // Check if Supabase is configured
  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                  Authentication Not Configured
                </h3>
                <p className="text-sm text-yellow-700 mb-4">
                  ระบบ Authentication ยังไม่ได้ตั้งค่า Supabase
                </p>
                <Link
                  to="/"
                  className="inline-block text-sm text-yellow-800 hover:text-yellow-900 font-medium underline"
                >
                  ← กลับไปหน้าหลัก
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'กรุณากรอกอีเมล';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'กรุณากรอกรหัสผ่าน';
    } else if (formData.password.length < 8) {
      newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร';
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
    }

    // Display name
    if (!formData.displayName) {
      newErrors.displayName = 'กรุณากรอกชื่อ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) {
      return;
    }

    try {
      await signUp(formData.email, formData.password, {
        display_name: formData.displayName,
      });

      // Move to OTP step
      setStep(2);
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null,
      });
    }
  };

  // Step 2: OTP Sent (Email Verification)
  if (step === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              ตรวจสอบอีเมลของคุณ
            </h1>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />

              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                ส่งอีเมลยืนยันแล้ว!
              </h2>

              <p className="text-gray-600 mb-6">
                เราได้ส่งลิงก์ยืนยันไปที่
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-700 font-medium break-all">
                  {formData.email}
                </p>
              </div>

              <div className="space-y-4 text-left bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900">ขั้นตอนถัดไป:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                  <li>เปิดกล่องจดหมายของคุณ</li>
                  <li>หาอีเมลจาก "FMGS Registration System"</li>
                  <li>คลิกลิงก์ยืนยัน (OTP) ในอีเมล</li>
                  <li>กลับมาล็อกอินที่หน้านี้</li>
                </ol>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm text-yellow-700">
                      <strong>หมายเหตุ:</strong> ลิงก์ยืนยันจะหมดอายุใน 24 ชั่วโมง
                    </p>
                    <p className="text-sm text-yellow-700 mt-1">
                      ถ้าไม่เจออีเมล ลองตรวจสอบในโฟลเดอร์ Spam/Junk
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/login"
                className="btn-primary w-full inline-block text-center"
              >
                ไปหน้าเข้าสู่ระบบ
              </Link>

              <button
                onClick={() => setStep(1)}
                className="mt-4 text-sm text-gray-500 hover:text-gray-700"
              >
                ← กลับไปแก้ไขข้อมูล
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 1: Signup Form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-12">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            สมัครสมาชิก
          </h1>
          <p className="text-gray-600">
            สร้างบัญชีใหม่พร้อมยืนยันตัวตนทางอีเมล
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Alert */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Display Name */}
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
                ชื่อ-นามสกุล
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="displayName"
                  name="displayName"
                  type="text"
                  required
                  value={formData.displayName}
                  onChange={handleChange}
                  className={`input pl-10 ${errors.displayName ? 'border-red-300' : ''}`}
                  placeholder="สมชาย ใจดี"
                  disabled={isLoading}
                />
              </div>
              {errors.displayName && (
                <p className="mt-1 text-sm text-red-600">{errors.displayName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                อีเมล
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`input pl-10 ${errors.email ? 'border-red-300' : ''}`}
                  placeholder="your@email.com"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                รหัสผ่าน
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`input pl-10 ${errors.password ? 'border-red-300' : ''}`}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                ต้องมีอย่างน้อย 8 ตัวอักษร
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                ยืนยันรหัสผ่าน
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`input pl-10 ${errors.confirmPassword ? 'border-red-300' : ''}`}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                ฉันยอมรับ{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  ข้อกำหนดการใช้งาน
                </a>{' '}
                และ{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  นโยบายความเป็นส่วนตัว
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  กำลังสมัครสมาชิก...
                </>
              ) : (
                'สมัครสมาชิก'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              มีบัญชีอยู่แล้ว?{' '}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                เข้าสู่ระบบ
              </Link>
            </p>
          </div>

          {/* Guest Access */}
          <div className="mt-4 text-center">
            <Link
              to="/"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← เข้าชมแบบไม่ต้อง login
            </Link>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-700">
                <strong>การยืนยันตัวตนทางอีเมล (OTP)</strong>
              </p>
              <p className="text-sm text-blue-600 mt-1">
                หลังจากสมัครสมาชิก ระบบจะส่งลิงก์ยืนยันไปยังอีเมลของคุณ กรุณาคลิกลิงก์เพื่อเปิดใช้งานบัญชี
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
