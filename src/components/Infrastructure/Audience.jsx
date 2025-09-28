import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Classrooms = () => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const classroomCategories = [
    {
      id: 'all',
      name: t('classrooms.allRooms'),
      icon: '🏫',
      count: 12
    },
    {
      id: 'lecture',
      name: t('classrooms.lectureHalls'),
      icon: '👨‍🏫',
      count: 4
    },
    {
      id: 'laboratory',
      name: t('classrooms.laboratories'),
      icon: '🔬',
      count: 5
    },
    {
      id: 'practice',
      name: t('classrooms.practiceRooms'),
      icon: '💊',
      count: 3
    }
  ];

  const classrooms = [
    {
      id: 1,
      name: t('classrooms.room101'),
      category: 'lecture',
      capacity: '120',
      equipment: ['classrooms.projector', 'classrooms.soundSystem', 'classrooms.microphones', 'classrooms.documentCamera'],
      description: t('classrooms.room101Desc'),
      image: '📊',
      features: ['classrooms.wifi', 'classrooms.airConditioning', 'classrooms.disabledAccess'],
      floor: '1',
      size: '200'
    },
    {
      id: 2,
      name: t('classrooms.room201'),
      category: 'laboratory',
      capacity: '30',
      equipment: ['classrooms.microscopes', 'classrooms.labEquipment', 'classrooms.computers', 'classrooms.specimens'],
      description: t('classrooms.room201Desc'),
      image: '🔬',
      features: ['classrooms.ventilation', 'classrooms.safetyEquipment', 'classrooms.wifi'],
      floor: '2',
      size: '80'
    },
    {
      id: 3,
      name: t('classrooms.room301'),
      category: 'practice',
      capacity: '25',
      equipment: ['classrooms.hospitalBeds', 'classrooms.medicalPhantoms', 'classrooms.simulationEquipment', 'classrooms.monitors'],
      description: t('classrooms.room301Desc'),
      image: '🩺',
      features: ['classrooms.airConditioning', 'classrooms.storage', 'classrooms.wifi'],
      floor: '3',
      size: '90'
    },
    {
      id: 4,
      name: t('classrooms.room102'),
      category: 'lecture',
      capacity: '80',
      equipment: ['classrooms.projector', 'classrooms.whiteboard', 'classrooms.documentCamera'],
      description: t('classrooms.room102Desc'),
      image: '📚',
      features: ['classrooms.wifi', 'classrooms.airConditioning'],
      floor: '1',
      size: '150'
    },
    {
      id: 5,
      name: t('classrooms.room202'),
      category: 'laboratory',
      capacity: '20',
      equipment: ['classrooms.chemistryEquipment', 'classrooms.safetyCabinets', 'classrooms.computers'],
      description: t('classrooms.room202Desc'),
      image: '🧪',
      features: ['classrooms.ventilation', 'classrooms.emergencyShower', 'classrooms.wifi'],
      floor: '2',
      size: '60'
    },
    {
      id: 6,
      name: t('classrooms.room302'),
      category: 'practice',
      capacity: '15',
      equipment: ['classrooms.dentalChairs', 'classrooms.dentalEquipment', 'classrooms.simulationTools'],
      description: t('classrooms.room302Desc'),
      image: '🦷',
      features: ['classrooms.airConditioning', 'classrooms.waterSupply', 'classrooms.wifi'],
      floor: '3',
      size: '70'
    }
  ];

  const filteredClassrooms = activeCategory === 'all' 
    ? classrooms 
    : classrooms.filter(room => room.category === activeCategory);

  const statistics = [
    { number: '50+', label: t('classrooms.totalRooms') },
    { number: '1200', label: t('classrooms.totalCapacity') },
    { number: '95%', label: t('classrooms.equipped') },
    { number: '24/7', label: t('classrooms.access') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('classrooms.heroTitle')}
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {t('classrooms.heroSubtitle')}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">
            {t('classrooms.categories')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {classroomCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                }`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="font-bold text-lg">{category.name}</div>
                <div className="text-sm opacity-80 mt-1">{category.count} {t('classrooms.rooms')}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Classrooms Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-800 mb-12 text-center">
            {t('classrooms.availableRooms')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredClassrooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedRoom(room)}
              >
                <div className="bg-blue-100 p-8 text-center">
                  <div className="text-6xl mb-4">{room.image}</div>
                  <h3 className="text-2xl font-bold text-blue-800">{room.name}</h3>
                  <div className="text-blue-600 font-semibold">{t(`classrooms.${room.category}Rooms`)}</div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                      {t('classrooms.capacity')}: {room.capacity}
                    </div>
                    <div className="text-gray-600">
                      {t('classrooms.floor')} {room.floor}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {room.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.features.slice(0, 2).map((feature, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                      >
                        {t(feature)}
                      </span>
                    ))}
                    {room.features.length > 2 && (
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                        +{room.features.length - 2}
                      </span>
                    )}
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    {t('classrooms.viewDetails')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Room Details Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-blue-600 text-white p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedRoom.name}</h2>
                  <div className="flex items-center space-x-4">
                    <span className="bg-blue-500 px-3 py-1 rounded-full">
                      {t(`classrooms.${selectedRoom.category}Rooms`)}
                    </span>
                    <span>{t('classrooms.floor')} {selectedRoom.floor}</span>
                    <span>{selectedRoom.size}m²</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRoom(null)}
                  className="text-white hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="text-center bg-blue-50 rounded-2xl p-8 mb-6">
                    <div className="text-8xl mb-4">{selectedRoom.image}</div>
                    <div className="text-2xl font-bold text-blue-800">{selectedRoom.name}</div>
                  </div>

                  <h3 className="text-xl font-bold text-blue-800 mb-4">
                    {t('classrooms.description')}
                  </h3>
                  <p className="text-gray-700 mb-6">{selectedRoom.description}</p>

                  <h3 className="text-xl font-bold text-blue-800 mb-4">
                    {t('classrooms.features')}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {selectedRoom.features.map((feature, index) => (
                      <div
                        key={index}
                        className="bg-blue-50 text-blue-800 px-3 py-2 rounded-lg flex items-center"
                      >
                        <span className="text-green-500 mr-2">✓</span>
                        {t(feature)}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                    <h3 className="text-xl font-bold text-blue-800 mb-4">
                      {t('classrooms.roomSpecs')}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('classrooms.capacity')}:</span>
                        <span className="font-bold">{selectedRoom.capacity} {t('classrooms.students')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('classrooms.area')}:</span>
                        <span className="font-bold">{selectedRoom.size}m²</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('classrooms.floor')}:</span>
                        <span className="font-bold">{selectedRoom.floor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('classrooms.type')}:</span>
                        <span className="font-bold">{t(`classrooms.${selectedRoom.category}Rooms`)}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-blue-800 mb-4">
                    {t('classrooms.equipment')}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {selectedRoom.equipment.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white border border-blue-200 text-blue-800 px-3 py-2 rounded-lg"
                      >
                        {t(item)}
                      </div>
                    ))}
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-green-800 mb-2">
                      {t('classrooms.booking')}
                    </h3>
                    <p className="text-green-700 mb-4">
                      {t('classrooms.bookingDesc')}
                    </p>
                    <button className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors">
                      {t('classrooms.bookNow')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Equipment Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-800 mb-12 text-center">
            {t('classrooms.modernEquipment')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🖥️</div>
              <h3 className="text-xl font-bold text-blue-800 mb-3">
                {t('classrooms.digitalClassrooms')}
              </h3>
              <p className="text-gray-600">
                {t('classrooms.digitalClassroomsDesc')}
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-bold text-blue-800 mb-3">
                {t('classrooms.laboratoryEquipment')}
              </h3>
              <p className="text-gray-600">
                {t('classrooms.laboratoryEquipmentDesc')}
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🩺</div>
              <h3 className="text-xl font-bold text-blue-800 mb-3">
                {t('classrooms.simulationEquipment')}
              </h3>
              <p className="text-gray-600">
                {t('classrooms.simulationEquipmentDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Classrooms;