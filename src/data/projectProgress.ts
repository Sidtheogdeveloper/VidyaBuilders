import { OwnedUnit } from '../types';

// Mock data for demonstration - in real app, this would come from Firebase
export const mockOwnedUnits: OwnedUnit[] = [
  {
    id: 'unit-001',
    projectId: '2',
    projectName: 'Vidya Elite Towers',
    unitType: '3 BHK',
    unitNumber: 'A-1205',
    floorNumber: 12,
    purchaseDate: '2023-08-15',
    expectedCompletion: '2025-08-30',
    currentProgress: 65,
    milestones: [
      {
        id: 'milestone-1',
        title: 'Foundation & Structure',
        description: 'Foundation work and structural framework completion',
        completedDate: '2023-12-20',
        isCompleted: true,
        images: ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'],
        order: 1
      },
      {
        id: 'milestone-2',
        title: 'Walls & Roofing',
        description: 'Wall construction and roofing work',
        completedDate: '2024-03-15',
        isCompleted: true,
        images: ['https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg'],
        order: 2
      },
      {
        id: 'milestone-3',
        title: 'Electrical & Plumbing',
        description: 'Electrical wiring and plumbing installation',
        completedDate: '2024-06-10',
        isCompleted: true,
        order: 3
      },
      {
        id: 'milestone-4',
        title: 'Interior Finishing',
        description: 'Flooring, painting, and interior work',
        isCompleted: false,
        order: 4
      },
      {
        id: 'milestone-5',
        title: 'Final Inspection',
        description: 'Quality check and final handover preparation',
        isCompleted: false,
        order: 5
      }
    ]
  }
];