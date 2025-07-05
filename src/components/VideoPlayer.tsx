
export default function VideoPlayer({videoUrl} : {videoUrl: string}) {
    const isValidUrl = (url: string) => {
      try {
        new URL(url);
        return true;
      } catch (e) {
        return false;
      }
    };
    
    if (!isValidUrl(videoUrl)) return < div className="h-full w-full">Video no encontrado</div>
  
    return (
    <div className="relative h-full w-full flex justify-center items-center">
        <video controls width="100%" height="100%" className=' rounded-2xl'>
            <source src={videoUrl} type="video/mp4" />
            Tu navegador no soporta videos HTML5.
        </video>
    </div>
  );
}