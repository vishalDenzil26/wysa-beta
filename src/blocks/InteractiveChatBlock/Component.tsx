'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/cn'
import { motion, AnimatePresence } from 'framer-motion'
import { VideoDialog } from '@/components/Dialogs/VideoDialog'

interface Pin {
  id: number
  x: number
  y: number
  conversation: Record<string, string>[]
  chatBoxPosition: 'left' | 'right'
}

const pins: Pin[] = [
  {
    id: 1,
    x: 17,
    y: 50,
    conversation: [
      {
        patient: 'I’ve been so overwhelmed at work lately. I just can’t seem to keep up.',
      },
      {
        therapist: "I’m really sorry to hear you're feeling this way 😔. ",
      },
      {
        therapist: 'What’s been the most challenging part for you lately?',
      },
      {
        patient:
          'Deadlines. There’s always more to do, and I feel like I’m drowning. It’s affecting my home life too.',
      },
      {
        therapist:
          'That sounds incredibly stressful. How do you usually cope with so many deadlines?',
      },
      {
        patient: "I'm usually better at planning my day, but there's just too much to do.",
      },
      {
        therapist:
          'It’s tough when it starts affecting other aspects of your life too. Maybe we could try a tool to help you organize your day and prioritize tasks?',
      },
    ],
    chatBoxPosition: 'right',
  },
  // {
  //   id: 2,
  //   x: 55,
  //   y: 61,
  //   conversation: [
  //     {
  //       patient: 'I’m so worried about how I’m going to afford all of the bills this month, I’m not sure how we’re going to manage.',
  //     },
  //     {
  //       therapist: "That sounds really tough. 💛",
  //     },
  //     {
  //       therapist: 'Can you tell me a bit more about which bills and causing the most stress right now',
  //     },
  //     {
  //       patient: "Mostly my utility bills they just keep on adding up",
  //     },
  //     {
  //       therapist: 'Utilities can be really stressful when they pile up.',
  //     },
  //     {
  //       therapist: 'Have you been able to explore any financial assistance programs or ways to cut back on usage?',
  //     },
  //     {
  //       patient: "No I havent",
  //     },
  //     {
  //       therapist: "It’s understandable, handling utilities can be overwhelming.",
  //     },
  //     {
  //       therapist: 'How about trying a tool that could help you manage these worries?',
  //     },

  //   ],
  //   chatBoxPosition: 'right',
  // },
  {
    id: 2,
    x: 26,
    y: 86,
    conversation: [
      {
        patient: 'I have so much homework and I don’t understand any of it',
      },
      {
        therapist: 'That sounds very overwhelming 😔',
      },
      {
        therapist:
          'Can you tell me more about which subjects or tasks are particularly confusing for you.',
      },
      {
        patient: 'I’m really struggling with math',
      },
      {
        therapist: 'Math can be really tricky and confusing.',
      },
      {
        therapist: 'Are there specific topics or problems in math giving you the most trouble?',
      },
      {
        patient: ' All of it',
      },
      {
        therapist: 'It sounds like you’re really feeling overwhelmed with math',
      },
      {
        therapist:
          'Would you like some help organizing your tasks and finding a strategy to tackle your math homework bit by bit?',
      },
    ],
    chatBoxPosition: 'right',
  },
  {
    id: 3,
    x: 88,
    y: 82,
    conversation: [
      {
        patient: 'Some kids at school keep picking on me, and I hate it.',
      },
      {
        therapist: 'That sounds really tough. 😔',
      },
      {
        therapist: "Do you want to talk more about what they’re doing or how it's making you feel?",
      },
      {
        patient: 'They keep calling me names and laughing at me, I feel so alone',
      },
      {
        therapist: 'That must be really hurtful 😢',
      },
      {
        therapist: 'Have you talked to anyone else about how you’re feeling?',
      },
      {
        patient: 'No I don’t know who to talk to about it',
      },
      {
        therapist: 'Not knowing who to talk to can feel confusing and lonely.',
      },
      {
        therapist: 'Would you like to try a tool to help plan how to have that conversation?',
      },
    ],
    chatBoxPosition: 'left',
  },
  {
    id: 4,
    x: 71,
    y: 32,
    conversation: [
      {
        patient:
          'I’m so worried about how I’m going to afford all of the bills this month, I’m not sure how we’re going to manage.',
      },
      {
        therapist: 'That sounds really tough. 💛',
      },
      {
        therapist:
          'Can you tell me a bit more about which bills and causing the most stress right now',
      },
      {
        patient: 'Mostly my utility bills they just keep on adding up',
      },
      {
        therapist: 'Utilities can be really stressful when they pile up.',
      },
      {
        therapist:
          'Have you been able to explore any financial assistance programs or ways to cut back on usage?',
      },
      {
        patient: 'No I havent',
      },
      {
        therapist: 'It’s understandable, handling utilities can be overwhelming.',
      },
      {
        therapist: 'How about trying a tool that could help you manage these worries?',
      },
    ],
    chatBoxPosition: 'left',
  },
]

export const remove = (arr: number[], item: number) => {
  const newArr = [...arr]
  newArr.splice(
    newArr.findIndex((i) => i === item),
    1,
  )
  return newArr
}

let newIndex = 0
export const add = (arr: number[]) => {
  newIndex++
  return [...arr, newIndex]
}

const ChatSimulator = ({ conversation, chatBoxPosition }) => {
  const [notifications, setNotifications] = useState<Record<string, string>[]>([])
  const [next, setNext] = useState(0)
  const [typing, setTyping] = useState('')
  function handleAddNotification() {
    const [user, message] = Object.entries(conversation[next])[0]

    setNotifications([...notifications, { [user]: '' }])
    setTimeout(() => {
      setTyping('')
      setNotifications([
        ...notifications.slice(0, notifications.length),
        { [user]: message as string },
      ])
      setNext(notifications.length + 1)
    }, 3000)
  }

  function handleTyping() {
    if (notifications.length === conversation.length) {
      return
    }
    const [user] = Object.entries(conversation[notifications.length])[0]
    setTimeout(
      () => {
        setTyping(user)
        handleAddNotification()
      },
      notifications.length === 0 ? 0 : 2000,
    )
  }
  useEffect(() => {
    handleTyping()
  }, [next])
  return (
    <div className="h-[320px] w-60 xl:w-72 overflow-clip">
      <ul className="flex flex-1 list-none flex-col-reverse h-full gap-y-4 xl:gap-y-5 ">
        <AnimatePresence initial={false}>
          {notifications
            .slice(notifications.length - 2)
            .reverse()
            .map((notification, id) => {
              const [user, message] = Object.entries(notification)[0]

              return (
                <motion.li
                  className={cn(
                    'py-3 xl:py-4 px-4 rounded-xl min-h-10',
                    typing !== '' && id == 0 && 'w-max',
                    typing === '' && message && 'w-60 xl:w-72',
                    user === 'therapist' && 'bg-primary text-white ',
                    user === 'patient' && 'bg-white text-black ',
                    chatBoxPosition === 'left' && user === 'patient' && ' !rounded-br-none',
                    chatBoxPosition === 'right' && user === 'therapist' && ' !rounded-br-none',
                    chatBoxPosition === 'left' && user === 'therapist' && '!rounded-bl-none',
                    chatBoxPosition === 'right' && user === 'patient' && '!rounded-bl-none',
                  )}
                  key={id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: 'linear' }}
                >
                  {typing && id === 0 && (
                    <div className="flex space-x-2">
                      <div
                        className={cn(
                          'w-3 h-3 rounded-full animate-bounce',
                          typing === 'therapist' ? 'bg-white' : 'bg-gray-400',
                        )}
                      ></div>
                      <div
                        className={cn(
                          'w-3 h-3 rounded-full animate-bounce delay-100',
                          typing === 'therapist' ? 'bg-white' : 'bg-gray-400',
                        )}
                      ></div>
                      <div
                        className={cn(
                          'w-3 h-3 rounded-full animate-bounce delay-200',
                          typing === 'therapist' ? 'bg-white' : 'bg-gray-400',
                        )}
                      ></div>
                    </div>
                  )}
                  {message && <span className="max-xl:text-sm">{message}</span>}
                </motion.li>
              )
            })}
        </AnimatePresence>
      </ul>
    </div>
  )
}

export const InteractiveChatBlock = () => {
  const [activePin, setActivePin] = useState<number | null>(null)

  const getChatBoxPosition = (pin: Pin) => {
    let verticalTransform = '-100%'
    let verticalOffset = '70px'

    if (pin.y > 70) {
      verticalOffset = '45px'
    }

    if (pin.chatBoxPosition === 'left') {
      return {
        left: `${pin.x}%`,
        top: `${pin.y}%`,
        transform: `translate(-100%, ${verticalTransform})`,
        marginTop: verticalOffset,
        marginLeft: '-20px',
      }
    } else {
      return {
        left: `${pin.x}%`,
        top: `${pin.y}%`,
        transform: `translate(0%, ${verticalTransform})`,
        marginTop: verticalOffset,
        marginLeft: '60px',
      }
    }
  }

  return (
    <div className="relative w-full container overflow-hidden">
      <div className="max-md:hidden">
        <Image
          src="/assets/homeChat.jpeg"
          alt="Interactive kitchen scene"
          width={1200}
          height={800}
          className="w-full h-auto rounded-2xl"
        />

        {pins.map((pin) => (
          <div key={pin.id} style={{ left: `${pin.x}%`, top: `${pin.y}%` }} className="absolute">
            <button
              // onClick={() => setActivePin(activePin === pin.id ? null : pin.id)}
              onMouseEnter={() => setActivePin(pin.id)}
              onMouseLeave={() => setActivePin(null)}
              className={cn(
                'bg-secondary rounded-full p-2 text-white transition-transform hover:scale-110 ease-linear duration-300 hover:rotate-45',
                activePin === pin.id && 'rotate-45',
              )}
            >
              <svg
                className="w-3 md:w-6 h-auto"
                width="25"
                height="25"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        ))}

        {pins.map(
          (pin) =>
            activePin === pin.id && (
              <div key={pin.id} style={getChatBoxPosition(pin)} className="absolute z-10">
                <ChatSimulator
                  conversation={pin.conversation}
                  chatBoxPosition={pin.chatBoxPosition}
                />
              </div>
            ),
        )}
      </div>
      <div className="md:hidden">
        <VideoDialog
          src={'/assets/homeChatVideo.mp4'}
          mimeType={'video/mp4'}
          title={''}
          controls={false}
          autoPlay={true}
        >
          <div className="w-full h-full">
            <div className="h-full w-full relative rounded-2xl overflow-hidden">
              <Image
                src="/assets/homeChatThumbnail.webp"
                alt="Interactive kitchen scene"
                width={1200}
                height={800}
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
        </VideoDialog>
      </div>
    </div>
  )
}
