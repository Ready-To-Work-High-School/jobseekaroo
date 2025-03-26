
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Clock, Calendar } from "lucide-react";
import { useFadeIn } from "@/utils/animations";

const EducationalVideoSection = () => {
  const fadeAnimation = useFadeIn(400);
  
  const videos = [
    {
      id: 1,
      title: "Resume Building Workshop",
      duration: "32 min",
      date: "Mar 15, 2023",
      thumbnail: "https://img.youtube.com/vi/u75hUSShvnc/maxresdefault.jpg",
      description: "Learn how to create a professional resume that stands out to employers."
    },
    {
      id: 2,
      title: "What is ESB Certification?",
      duration: "3 min",
      date: "Oct 12, 2022",
      thumbnail: "https://img.youtube.com/vi/bjjLKdTgl6g/maxresdefault.jpg",
      description: "Learn about the Entrepreneurship & Small Business (ESB) certification and its benefits for students and employers."
    },
    {
      id: 3,
      title: "Interview Preparation Guide",
      duration: "8 min",
      date: "Sep 15, 2022",
      thumbnail: "https://img.youtube.com/vi/ytckc4Gljlo/maxresdefault.jpg",
      description: "Essential tips and strategies to help you prepare for job interviews and make a great impression."
    }
  ];
  
  return (
    <div className={`${fadeAnimation} max-w-5xl mx-auto my-12`}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Educational Videos</h2>
        <p className="text-muted-foreground mt-2">
          Watch and learn from our collection of educational videos
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative aspect-video bg-muted">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <a href={`https://www.youtube.com/watch?v=${video.thumbnail.split('/')[4].split('/')[0]}`} target="_blank" rel="noopener noreferrer" className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                  <Play className="h-8 w-8 text-white" fill="white" />
                </a>
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{video.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                {video.description}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{video.duration}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{video.date}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EducationalVideoSection;
