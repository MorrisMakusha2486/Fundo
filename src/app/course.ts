// filepath: src/app/course.ts
export interface Course {
    id: number;
    title: string;
    description: string;
    instructor: string;
    imageUrl: string;
    videoUrl: string; // Example: URL to the main course video
    modules: Module[];
    rating: number;
    price: number;
    participants: number;
    enrolledLastMonth: number;
    skills: string[];
  }
  
  export interface Module {
      id: number;
      title: string;
      videos: Video[];
  }
  
  export interface Video {
      id: number;
      title: string;
      url: string;
      duration: string;
  }