
import { Users, Luggage, Star } from "lucide-react";
import { IPackage } from "@/types";
interface Props {
  vehicles?: IPackage[];
}
const FleetSection = ({ vehicles }: Props) => {

  return (
    <section
      id="fleet"
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-fuchsia-900 text-white px-4 py-2 rounded-full mb-6 shadow-md">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">Premium Fleet</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-primary">Vehicle Collection</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience exceptional comfort and style with our meticulously
            maintained luxury vehicles, each equipped with premium amenities for
            your journey.
          </p>
        </div>

        {/* Vehicle Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles?.map((vehicle) => (
            <div
              key={vehicle.id}
              className={`relative group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-2xl`}
            >

              {/* Image with overlay effect */}
              <div className="relative overflow-hidden h-52">
                <img
                  src={`${vehicle.image?.url}`}
                  alt={vehicle.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              </div>

              {/* Card Content */}
              <div className="p-5">
                {/* Vehicle name and type */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 truncate">
                    {vehicle.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{vehicle.type}</p>
                </div>

                {/* Capacity Info */}
                <div className="flex justify-between items-center mb-5 bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="bg-secondary/10 p-2 rounded-full">
                      <Users className="h-4 w-4 text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Passengers</div>
                      <div className="font-semibold text-gray-900">
                        {vehicle.num_of_passengers}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="bg-secondary/10 p-2 rounded-full">
                      <Luggage className="h-4 w-4 text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Large Bags</div>
                      <div className="font-semibold text-gray-900">
                        {vehicle.num_of_big_suits}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-5">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Key Features:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {vehicle?.features?.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-primary text-xs px-3 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                    {vehicle?.features?.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                        +{vehicle.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
