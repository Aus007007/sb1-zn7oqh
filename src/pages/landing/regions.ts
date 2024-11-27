import {
  Users,
  Clock,
  Calendar,
  TrendingUp,
  Award,
  DollarSign,
  FileText,
  Shield,
  Smartphone,
  Globe,
  BarChart,
  Settings,
} from 'lucide-react';

export const regions = {
  in: {
    hero: {
      title: 'Transform Your HR Management in India',
      subtitle: 'Comprehensive HR solution designed for Indian businesses, compliant with local regulations',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000&h=600',
      video: 'https://your-video-cdn.com/india-demo.mp4',
    },
    pricing: {
      starter: '₹4,999',
      business: '₹9,999',
      enterprise: 'Custom',
      currency: '₹',
      period: '/month',
    },
    features: [
      {
        icon: Users,
        title: 'Employee Management',
        description: 'Complete employee lifecycle management with compliance to Indian labor laws',
        image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=400&h=300',
      },
      {
        icon: Clock,
        title: 'Attendance Tracking',
        description: 'Flexible attendance tracking with biometric integration support',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400&h=300',
      },
      {
        icon: Calendar,
        title: 'Leave Management',
        description: 'Automated leave management with Indian holiday calendar',
        image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=400&h=300',
      },
      {
        icon: DollarSign,
        title: 'Payroll Processing',
        description: 'India-specific payroll with tax calculations and compliance',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400&h=300',
      },
    ],
    testimonials: [
      {
        name: 'Rajesh Kumar',
        position: 'HR Director',
        company: 'Tech Solutions India',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100',
        quote: 'The compliance features have been a game-changer for our HR operations.',
      },
      {
        name: 'Priya Sharma',
        position: 'HR Manager',
        company: 'Global Services Ltd',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100',
        quote: 'Excellent platform for managing our diverse workforce across multiple locations.',
      },
    ],
  },
  us: {
    hero: {
      title: 'Modern HR Management for US Companies',
      subtitle: 'Streamline your HR operations with our comprehensive solution',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000&h=600',
      video: 'https://your-video-cdn.com/us-demo.mp4',
    },
    pricing: {
      starter: '$99',
      business: '$199',
      enterprise: 'Custom',
      currency: '$',
      period: '/month',
    },
    features: [
      {
        icon: Users,
        title: 'Employee Management',
        description: 'Complete employee lifecycle management with US compliance',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=400&h=300',
      },
      {
        icon: Shield,
        title: 'Compliance Management',
        description: 'Stay compliant with US labor laws and regulations',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400&h=300',
      },
      {
        icon: Calendar,
        title: 'PTO Management',
        description: 'Flexible PTO tracking and approval workflows',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400&h=300',
      },
      {
        icon: DollarSign,
        title: 'Benefits Administration',
        description: 'Comprehensive benefits management and enrollment',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=400&h=300',
      },
    ],
    testimonials: [
      {
        name: 'Sarah Johnson',
        position: 'VP of HR',
        company: 'TechCorp USA',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100',
        quote: 'This platform has revolutionized how we handle HR processes.',
      },
      {
        name: 'Michael Brown',
        position: 'HR Director',
        company: 'Innovation Labs',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100',
        quote: 'The best HR solution we have used. Incredible features and support.',
      },
    ],
  },
  // ... rest of the regions remain the same
};