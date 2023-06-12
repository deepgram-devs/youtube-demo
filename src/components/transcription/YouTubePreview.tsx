import YouTube from "react-youtube";

const YouTubePreview = ({ videoId }: { videoId: string }) => {
  return (
    <div
      className="w-full aspect-w-16 aspect-h-9 rounded-xl overflow-hidden bg-cover"
      style={{
        backgroundImage: videoId
          ? `url("//i.ytimg.com/vi/${videoId}/default.jpg")`
          : '/placeholder.jpg")',
      }}
    >
      <YouTube
        videoId={videoId}
        id="the-video"
        className="w-full aspect-w-16 aspect-h-9 rounded-xl overflow-hidden"
        opts={{
          width: "auto",
          height: "auto",
        }}
      />
    </div>
  );
};

export default YouTubePreview;
