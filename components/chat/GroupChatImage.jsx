export default function GroupChatImage({ chatData, size, text_size}) {
    return (
      <div 
      className='relative flex justify-center items-center text-8xl font-bold text-accent grad-1 rounded-full group cursor-pointer'
      htmlFor="single"
      style={{ height: size, width: size }}
      >
              {chatData && chatData.image ? (
                  <img
                  src={`https://bxnclqtavxncwdogrurd.supabase.co/storage/v1/object/public/image-group-chats/${chatData.image}`}
                  alt="chatImage"
                  className="rounded-full"
                  style={{ height: size, width: size }}
                  />
              ) : (
                  <div className={`absolute group-hover:opacity-0 opacity-100 transition text-white text-${text_size}`}>
                      { chatData !== null && 
                          chatData.chat_title[0].toUpperCase()
                      }
                  </div>
              )}
      </div>
    )
  }