// Test file to check API functions
import { aboutSectionAPI } from './services/aboutSectionAPI';

console.log('aboutSectionAPI object:', aboutSectionAPI);
console.log('Available functions:', Object.keys(aboutSectionAPI));
console.log('getFounders function:', typeof aboutSectionAPI.getFounders);
console.log('getStructure function:', typeof aboutSectionAPI.getStructure);
console.log('getAchievements function:', typeof aboutSectionAPI.getAchievements);
console.log('getStatistics function:', typeof aboutSectionAPI.getStatistics);

// Test calling the functions
try {
    console.log('Testing getFounders...');
    aboutSectionAPI.getFounders().then(response => {
        console.log('getFounders response:', response.data);
    }).catch(error => {
        console.error('getFounders error:', error);
    });
} catch (error) {
    console.error('getFounders call failed:', error);
}