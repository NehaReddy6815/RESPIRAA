import AQIMap from "@/components/AQIMap";

const Maps = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold text-foreground">
          Air Quality Map
        </h1>
        <p className="text-muted-foreground">
          Real-time AQI across Bangalore regions
        </p>
      </header>

      {/* Map */}
      <div className="rounded-2xl overflow-hidden border border-white/10">
        <AQIMap />
      </div>
    </div>
  );
};

export default Maps;