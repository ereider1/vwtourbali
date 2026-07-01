"use client";

const reasons = [
  {
    title: "Premium Fleet",
    description: "Drive in iconic, well-maintained Volkswagens with modern comfort features.",
    icon: "🚗",
  },
  {
    title: "Expert Guides",
    description: "Local experts share insider knowledge and authentic stories about Bali.",
    icon: "👨‍🎓",
  },
  {
    title: "Flexible Itineraries",
    description: "Customize your route and pace based on your preferences and interests.",
    icon: "🗺️",
  },
  {
    title: "Safety First",
    description: "All vehicles are insured, drivers are licensed, and safety is our priority.",
    icon: "🛡️",
  },
  {
    title: "Photography Stops",
    description: "Plenty of breaks for perfect photo opportunities and memorable moments.",
    icon: "📸",
  },
  {
    title: "Local Experiences",
    description: "Visit hidden gems and connect with local communities authentically.",
    icon: "🏘️",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-gray-50 py-20 lg:py-32">
      <div className="container-max container-padding">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <span className="badge">Why Choose Us</span>
          <h2 className="section-title mb-4 mt-4">What Makes Us Different</h2>
          <p className="section-subtitle">
            Experience Bali with a team dedicated to creating unforgettable memories.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, idx) => (
            <div key={idx} className="rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-lg">
              <div className="mb-4 text-4xl">{reason.icon}</div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid gap-8 md:grid-cols-4">
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-primary-600">5+</div>
            <p className="text-gray-600">Years Experience</p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-primary-600">50+</div>
            <p className="text-gray-600">Vehicles</p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-primary-600">2K+</div>
            <p className="text-gray-600">Tours Completed</p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-primary-600">100%</div>
            <p className="text-gray-600">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
}
