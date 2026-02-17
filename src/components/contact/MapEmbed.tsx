export default function MapEmbed() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-md h-80 bg-gray-200">
      <iframe
        title="Vivid Nails Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.0!2d-77.9967!3d38.4735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b43e1b1c1c1c1d%3A0x1234567890abcdef!2s15315+Montanus+Dr%2C+Culpeper%2C+VA+22701!5e0!3m2!1sen!2sus!4v1234567890"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
