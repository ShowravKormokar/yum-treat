// Sample data for cards
const stats = [
    { title: 'Total Orders', value: 128, color: 'bg-blue-100 text-blue-800' },
    { title: 'Total Sales', value: '$3,845.60', color: 'bg-green-100 text-green-800' },
    { title: 'Messages', value: 24, color: 'bg-purple-100 text-purple-800' },
    { title: 'Total Foods', value: 56, color: 'bg-amber-100 text-amber-800' },
    { title: 'Categories', value: 8, color: 'bg-red-100 text-red-800' }
];

const InfoCards = () => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
            {stats.length > 0 ? (
                stats.map((stat, index) => (
                    <div key={index} className={`p-6 rounded-lg shadow ${stat.color || 'bg-gray-100 text-gray-800'}`}>
                        <h3 className="text-lg font-medium">{stat.title || 'N/A'}</h3>
                        <p className="text-2xl font-bold mt-2">{stat.value || '0'}</p>
                    </div>
                ))
            ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                    No statistics data available
                </div>
            )}
        </div>
    );
    // 01721068063 1st
    // 01721664505 
};

export default InfoCards;