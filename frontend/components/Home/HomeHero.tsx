// Hero component
export default function HomeHero() {
  return (
    <div className="hero hero-bg min-h-screen">
      <div className="text-center hero-content">
        <div className="max-w-lg">
       

          <h1 className="mb-5 text-5xl font-bold">Take control of your data </h1>
          <p className="mb-5 text-lg">
            Pilotr is an <b>easy-to-use</b>, highly <b>intuitive platform</b> for working with
            <b>CSV files</b>. With Pilotr, teams can share <b>spreadsheets</b> from their
            desktop or mobile devices and <b>quickly share analytics with clients</b>,
            colleagues, and partners.
          </p>
          <div className="form-control flex space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered"
            />
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
}
