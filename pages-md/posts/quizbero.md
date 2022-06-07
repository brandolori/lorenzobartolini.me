---
title: "Quizbero: my bachelor's graduation thesis"
date: "2022-05-31"
summary: "A small look into my bachelor's graduation project, the web app Quizbero"
---

This blogpost is about Quizbero, an app developed during my Laurea Triennale in Ingegneria e Scienze Informatiche, at University of Bologna. Many thanks to my relator dott. Catia Prandi and everyone that was involved in the development process

## A little bit of context
What it Quizbero? Well, Quizbero is a web app born as a way to enhance the scope of the ReMade project. But wait, what is that supposed to be?

The ReMade project has the goal to instruct the public about Unibo ongoing effort of leaving paper in the past and embracing the digital, replacing as many traditional and paper-consuming processes with computer-based alternatives. This is archieved in a somewhat unusual way: by planting trees. Every tree planted, inside a so-called "digital garden", represents some amount of paper saved.

![Logo for the ReMade project](remade.webp "The ReMade logo, courtesy Unibo")

Now, try to imagine being a bored university student that goes for a walk through some trees. You're not gonna always care what those trees represent, are you? Not without a bit of a push. That is where Quizbero comes in! By placing small qr codes on some of the trees, those who pass by will (hopefully) be intrigued and will (even more hopefully) scan them, bringing them to a small digital experience that will (even even more hopefully) teach them something.

## Let me see it already!

![video](demo.webm "Wow! What a beautiful app.")

## But how does it work?
I'm sure that if you're reading this blog, you're familiar with how a website works. It's a web app based on Next.js and React. So I'm gonna skip the basics and get straight to the good stuff, alright?

### The cards
The quiz answering interface consists of a series of cards that you can swipe left or right to answer false or true respectively. The user experience was inspired by Tinder, yes, Tinder of all apps, because I thought it would be fun to make the answering experience engaging by itself. The implementation was a bit tricky, as it needs to work right on a variety of display and input devices, but I had a big help: the Framer Motion library.

Framer Motion takes care of the animation and the gesture part of the cards. So what's left for me? This:

```tsx
const Card = (props: CardProps) => {
    const motionValue = useMotionValue(0);

    // To rotate the card as the card moves on drag
    const cardRotation = useTransform(motionValue, [-200, 200], [-30, 30]);

    const cardOpacity = useTransform(
        motionValue,
        [-200, -150, 0, 150, 200],
        [0, 1, 1, 1, 0]
    );

    // I use the special motion.div instead of a normal div
    return <motion.div
        // When this prop is true, the card can be dragged by the user
        drag={props.interactable}
        dragConstraints={{ left: -1000, right: 1000 }}
        dragSnapToOrigin={true}
        style={{ ...styles.card, opacity: cardOpacity, rotate: cardRotation, x: motionValue }}
        
        onDragEnd={(event, info) => {

            // If the card is dragged over the threshold, call the callback
            if (Math.abs(info.offset.x) > 130) {
                props.onAnswer(info.offset.x > 0 ? "v" : "f")
            }
        }}
    >
        <span>
            {props.question}
        </span>
    </motion.div >
}
```
One interesting trick I had to resort to was the use of the `props.iteractable`: as the cards are all present and stacked from the start of the quiz, nothing stopped the user from reaching around and answering a question out of order. So I make sure that only the topmost card is interactable by only setting its `props.iteractable` to true.

### Bonus codes
The bonus codes system is one I'm simultaneously proud and non-proud of. It arose from the need to add some social interaction to Quizbero, simultaneously increasing engagement and creating new ways in which a user could get to know the app. There was a single, big, problem: I was not planning to add a backend to Quizbero, in an effort to keep the complexity of the project down and to meet the deadling (I had to graduate in time!).

So what did I do? I decided that a reasonable way to make users interact was to have them share with each other a code, that was unique to *some* users, and allowed the user to unlock a special, otherwise unaccessible quiz, that would make their profile complete. Now the only problem was deciding how the bonus codes would be assigned to the user.

Before finding a solution I had to lay some ground rules: for simplicity the codes would be few and pre-defined, and the system obviously needed to show the same code if the user closed and reopened the app. The system didn't *have* to be perfect to work, but considering the user base would probably consist of CS students, it needed to be *at least* somewhat tamper-proof. So, for example, it needed to show the same code if the user opened the site in an incognito window.

So what did I do? I opted to use a fingerprinting library, to almost-uniquely identify the device the user is navigating from, and use the id it generates to assign one of the codes. Here is how:

```ts
import fpjs from "@fingerprintjs/fingerprintjs"

const alphabet = 'abcdef'.split('');

const bonusCodes = [😉]

// returns one of the 6 codes above, making sure that they are distributed evenly
// using a fingerprinting library
const generateBonusCode = async () => {
    const library = await fpjs.load()
    const fingerprint = (await library.get()).visitorId.toLowerCase().split("")
    const firstLetter = fingerprint.filter(el => alphabet.includes(el))[0] ?? "a"
    return bonusCodes[alphabet.indexOf(firstLetter)]
}

const localStorageKey = "bonuscode"

const getBonusCode = async () => {
    let code = localStorage.getItem(localStorageKey)
    if (!code) {
        code = await generateBonusCode()
        localStorage.setItem(localStorageKey, code)
    }

    return code
}
```

The fingerprinting library employed is [FingerprintJS](https://github.com/fingerprintjs), the open source one. If you're too lazy to read the code, I don't blame you. So here's a rundown:

- I generate the fingerprint ID
- I remove all numbers from the string
- I look for the first letter in the string: it represents a hex digit, so it can be a letter from a to f
- based on which letter it is, I pick one of the pre-defined codes

It's not pretty, it's not "scientific", but in my (limited) testing it showed to generate a somewhat uniform distribution of the codes, so I left it as it is. If anything, it allowed me to take a look at how fingerprinting works.

## Can I try it?
Short answer, no.  
Long answer, yes! If you want, you can head to the [repository](https://github.com/brandolori/quizbero), clone it, and host it for yourself, including adding your own questions.

In the future, the app *might* be deployed for what it was originally intended, but this remains to be seen. I'll be sure to update this post if that happens!
