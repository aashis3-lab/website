export default function Footer() {
  return (
    <footer className="py-20 px-6 border-t border-stone/20 bg-cream">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div>
          <h2 className="text-4xl md:text-6xl font-serif mb-6 text-night">Let's build<br />something legendary.</h2>
          <a href="mailto:hello@example.com" className="text-lg font-sans border-b border-night pb-1 hover:text-terracotta hover:border-terracotta transition-colors">
            hello@example.com
          </a>
        </div>
        
        <div className="flex flex-col items-start md:items-end gap-4 text-sm font-sans text-stone uppercase tracking-widest">
          <div className="flex gap-6">
            <a href="#" className="hover:text-night transition-colors">Twitter</a>
            <a href="#" className="hover:text-night transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-night transition-colors">GitHub</a>
          </div>
          <p>&copy; {new Date().getFullYear()} Aashi Shah.</p>
        </div>
      </div>
    </footer>
  );
}
