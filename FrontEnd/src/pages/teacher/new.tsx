import NavigationTeacher from '@/components/navigationTeacher'
import { Roboto } from 'next/font/google'
import { useState } from 'react'
import { collection, addDoc, updateDoc } from "firebase/firestore";
import { db } from '../_app';

const roboto = Roboto({
    subsets: ['latin'],
    weight: '400'
})

export default function New() {

    const [lessonName, setLessonName] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('A+');
    const [selectedDifficulty, setSelectedDifficulty] = useState('Tough');
    const [selectedTypeOfQuestion, setSelectedTypeOfQuestion] = useState('MCQs');
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [openAIResponse, setOpenAIResponse] = useState('');

    const handleLessonNameChange = (event: any) => {
        setLessonName(event.target.value);
    }

    const handleGradeChange = (event: any) => {
        setSelectedGrade(event.target.value);
    }

    const handleDifficultyChange = (event: any) => {
        setSelectedDifficulty(event.target.value);
    }

    const handleTypeOfQuestion = (event: any) => {
        setSelectedTypeOfQuestion(event.target.value);
    }

    const handleLanguageChange = (event: any) => {
        setSelectedLanguage(event.target.value);
    }

    function handleFileSelection(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        setSelectedFile(file || null);
        console.log(selectedFile);
    }

    /*

    async function PDF2Text(file: File) {
        console.log('file : ', file);
        const response = await fetch('/api/pdf2text', {
            method: 'POST',
            headers: {
                'accept' : 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: JSON.stringify({
                file : file,
            }),
        }).catch((error) => {
            console.error('Error:', error);
        });
        console.log(response);
        console.log("response : ", JSON.stringify(response));
    }

    */

    

    const createLesson = async () => {
        if(selectedFile === null) {
            console.log("No file selected");
        }
        //Convert the PDF to Text
        //await PDF2Text(selectedFile as File);
        const content = "58 SCIENCE6The Living Organisms —\nCharacteristics and Habitats\nPaheli and Boojho went on\nvacation to many places of\ninterest. One such trip took\nthem to the river Ganga in Rishikesh.\nThey climbed the mountains of the\nHimalayas, where it was very cold. They\nsaw many kinds of trees on thesemountains — oaks, pines and deodars,\nvery different from the ones near their\nhome on the plains! In yet another trip,they travelled to Rajasthan and moved\non camels through the hot desert. They\ncollected different kinds of cactus plantsfrom this trip. Finally, they went on a\ntrip to Puri and visited the sea beach,\ndotted with casuarina trees. Whilerecollecting all the fun that they had on\nthese trips, a thought struck them. All\nthese places were so different from oneanother, some were cold, some very hot\nand dry, and some places so humid. And\nyet all of them had many organisms\n(living creatures) of various kinds.\nThey tried to think of a place on Earth\nwhere there may not be any livingcreatures. Boojho thought of  places near\nhis home. Inside the house, he tried the\ncupboards. He had thought that theremay not be any living organisms here,\nbut he found one tiny spider in the\ncupboard. Outside the home too, theredid not seem to be any place, he could\nthink of, that did not have living creatures6.1 O RGANISMS  AND THE\nSURROUNDINGS  WHERE THEY LIVE\nAnother thought that occurred to Paheli\nand Boojho was about the kinds of livingorganisms that were present in different\nlocations that they had visited. The\ndeserts had camels, the mountains hadgoats and yak. Puri had some other\ncreatures — crabs on the beach and\nsuch a variety of fish being caught bythe fishermen at the sea! And then,\nthere did seem to be some creatures like\nants that were present in all thesedifferent locations. The kinds of plants\nfound in each of these regions were so\ndifferent from the plants of the otherregions. What about the surroundingsof some kind or the other (Fig. 6.1). Paheli\nstarted thinking and reading about far\naway places. She read that people have\neven found tiny living organisms in theopenings of volcanoes!\nFig. 6.1  Search for living organisms\nRationalised 2023-24\n59 THE LIVING ORGANISMS  — C HARACTERISTICS  AND HABITATSin these different regions? Were they\nthe same?\nActivity 1\nLet us start with a forest. Think of allthe plants, animals and objects that canbe found there. List them in Column 1\nof Table 6.1. List things, animals and\nplants, found in the other regions thatare also shown in the table. You can\ncollect the examples scattered through\nthis chapter to fill Table 6.1. Discussalso with your friends, parents and\nteachers, to find more examples to fill\nthe tables. You can also consult manyinteresting books in libraries that talk\nof animals, plants and minerals of\ndifferent regions.\nTry and include many plants,\nanimals and objects, big and small, ineach of the columns in this table. Whatkind of objects will we find that may not\nbe animals or plants? Perhaps parts of\nplants like dried leaves, or parts ofanimals, like bones. We may also find\ndifferent kinds of soils and pebbles.\nWater in the oceans may have saltsdissolved in it as discussed in Chapter\n3. There could be many more objects.\nAs we go through the chapter, keep\nadding more examples to Table 6.1. Wewill discuss the table as we travel\nthrough many more interesting places.\n6.2 H ABITAT  AND ADAPTATION\nWhat do you find from the plants and\nanimals listed in Activity 1? Did you find\na large variety in them? Look at what you\nhave entered in the column for the desertand the column for the sea in Table 6.1.\nDid you list very different kind of\norganisms in these two columns?\nWhat are the surroundings like, in\nthese two regions?\nIn the sea, plants and animals are\nsurrounded by saline  (salty) water. Most\nof them use  the air dissolved in water.\nThere is very little water available in\nthe desert. It is very hot in the day time\nand very cold at night in the desert. The\nanimals and plants of the desert live onthe desert soil and breathe air from the\nsurroundings.\nThe sea and the desert are very\ndifferent surroundings and we find verydifferent kind of plants and animals in\nthese two regions, isn’t it? Let us lookat two very different kind of organisms\nfrom the desert and the sea – a camel\nand a fish. The body structure of a camelhelps it to survive in desert conditions.\nCamels have long legs which help to\nTable 6.1 Animals, plants and other objects found in different surroundings\nt s e r o f e h t n I s n i a t n u o m n O t r e s e d e h t n I a e s e h t n I ? r e h t o y n A\nRationalised 2023-24\n60 SCIENCEkeep their bodies away from the heat of\nthe sand (Fig. 6.2). They excrete smallamount of urine, their dung is dry and\nthey do not sweat. Since camels lose\nvery little water from their bodies, theycan live for many days without water.\nLet us look at different kinds of fish.\nSome of these are shown in Fig. 6.3.There are so many kinds of fish, but, do\nyou see that they all have something\ncommon about their shape? All the onesshown here have the streamlined shape\nthat was discussed in Chapter 5. This\nshape helps them move inside water.Fish have slippery scales on their bodies.\nThese scales protect the fish and also\nhelp in easy movement through water.We discussed in Chapter 5, that fish\nhave flat fins and tails that help them\nto change directions and keep their bodybalance in water. Gills present in the\nfish help them to use oxygen dissolved\nin water.\nWe see that the features of a fish help\nit to live inside water and the features ofa camel help it to survive in a desert.We have taken only two examples\nfrom a very wide variety of animals andplants that live on the Earth. In all this\nvariety of organisms, we will find that\nthey have certain features that helpthem live in the surroundings in which\nthey are normally found. The presence\nof specific features or certain habits,which enable an organism to live\nnaturally in a place is called adaptation.\nAdaptation of organisms differdepending on their place of dwelling.\nThat is why a fish cannot live out of\nwater and a camel cannot live in sea.\nThe place where organisms live is\ncalled habitat. Habitat means a dwelling\nplace (a home). The habitat providesfood, water, air, shelter and other needs\nto organisms.  Several kinds of plants\nand animals live in the same habitat.\nThe plants and animals that live on\nland are said to live in terrestrial\nhabitats. Some examples of terrestrial\nhabitats are forests, grasslands, deserts,\ncoastal and mountain regions. On the\nother hand, the habitats of plants and\nFig. 6.2  Camels in their surroundings Fig. 6.3  Different kinds of fish\nRationalised 2023-24\n61 THE LIVING ORGANISMS  — C HARACTERISTICS  AND HABITATSanimals that live in water are called\naquatic habitats . Lakes, rivers and\noceans are some examples of aquatic\nhabitats. There are large variations\namong terrestrial habitats like forests,grasslands, deserts, coastal and\nmountain regions located in different\nparts of the world.\nThe organisms, both plants and\nanimals, living in a habitat are its biotic\ncomponents. The non-living things suchas rocks, soil, air and water in\nthe habitat constitute its abiotic\ncomponents . Are sunlight and heat\nbiotic or abiotic components?\nWe know that some plants grow from\nseeds. Let us look at some abiotic factors\nand their effect on seeds as they grow\ninto young plants.\nActivity 2\nRecall Activity 7 in Chapter 4 — we made\nsprouts from gram  and maize  seeds.\nWhen the seed turned into a sprout, it\nis said to have germinated. This is the\nbeginning of life of a new plant.\nCollect some dry moong seeds. Keep\n20-30 seeds aside and soak the rest inwater for a day. Divide the soaked seeds\ninto four parts. Keep one partcompletely submerged in water for 3-4\ndays. Do not disturb the dry seeds and\nthose submerged in water. Keep one partof soaked seeds in a sunny room and\nanother in a completely dark\nregion like a cupboard that does notallow any light to come in. Keep the last\npart in very cold surroundings, say, in\na refrigerator or with ice around them.Rinse them and replace the water every\nday. What do you notice, after a few\ndays? Do the seeds in all the fiveconditions germinate uniformly? Do you\nfind slower or no germination in any of\nthese?\nDo you realise that abiotic factors like\nair, water, light and heat are importantfor the growth of plants. In fact, abioticfactors are important for all living\norganisms.\nWe find that organisms exist in very\ncold as well as very hot climates, isn’tit? How do they manage to survive?\nAdaptation is the method by whichorganisms get well adjusted to the\nclimate.There are some changes that can happen in an organism over a short period of\ntime to help them adjust to some changes in their surroundings. For instance,\nif we live in the plains and suddenly go to high mountain regions, we may\nexperience difficulty in breathing and doing physical exercise for some days.\nWe need to breathe faster when we are on high mountains. After some days,\nour body adjusts to the changed conditions on the high mountain. Such small\nchanges that take place in the body of a single organism over short periods, to\novercome small problems due to changes in the surroundings, are called\nacclimatisation. These changes are different from the adaptations that take\nplace over thousands of years.\nRationalised 2023-24\n62 SCIENCEAdaptation does not take place in a\nshort time because the abiotic factors of\na region also change very slowly. Those\norganisms which cannot adapt to these\nchanges die, and only the adapted onessurvive. Organisms adapt to different\nabiotic factors in different ways. This\nresults in a wide variety of organisms indifferent habitats.\nLet us look at some habitats,\nunderstood the abiotic factors and theadaptations of animals in these habitats.\n6.3 A J OURNEY  THROUGH  DIFFERENT\nHABITATS\nSome Terrestrial Habitats\nDeserts\nWe discussed the abiotic factors of a\ndesert and the adaptations in camels.What about other animals and plants\nthat are found in deserts? Do they\nhave the same kind of adaptations?\nThere are desert animals like rats\nand snakes, which do not have long legsthat a camel has. To stay away from theintense heat during the day, they stay\nin burrows deep in the sand (Fig 6.4).\nThese animals come out only during thenight, when it is cooler.\nFig. 6.5 shows some typical plants\nthat grow in a desert. How are theseadapted to the desert?\nActivity 3\nBring a potted cactus and a leafy plant\nto the classroom.  Tie polythene bags to\nsome parts of the two plants, as wasdone for Activity 4 in Chapter 4, where\nwe studied transpiration in plants.\nLeave the potted plants in the sun and\nobserve after a few hours. What do yousee? Do you notice any difference in the\namount of water collected in the two\npolythene bags?\nDesert plants lose very little water\nthrough transpiration. The leaves indesert plants are either absent, verysmall, or they are in the form of spines.\nThis helps in reducing loss of water from\nthe leaves through transpiration. Theleaf-like structure you see in a cactus\nis, in fact, its stem (Fig. 6.5).\nPhotosynthesis in these plants isusually carried out by the stems. TheFig. 6.4 Desert animals in burrows\nFig. 6.5 Some typical plants that grow in desert\nRationalised 2023-24\n63 THE LIVING ORGANISMS  — C HARACTERISTICS  AND HABITATSstem is also covered with a thick waxy\nlayer, which helps to retain water in thetissues of cacti. Most desert plants have\nroots that go very deep into the soil for\nabsorbing water.\nMountain regions\nThese habitats are normally very cold\nand windy. In some areas, snowfall may\ntake place in winters.\nThere is a large variety of plants and\nanimals living in the mountain regions.Have you seen the kind of trees shown\nin Fig. 6.6?also present on mountains. They mayhave different kind of adaptations tosurvive on the mountains.\nAnimals living in the mountain regions\nare also adapted to the conditions there(Fig. 6.7). They have thick skin or fur to\nprotect them from cold. For example, yaks\nhave long hair to keep them warm. Snowleopard has thick fur on its body\nFig. 6.6  Trees of a mountain habitat\nFig. 6.7  (a) Snow\nleopard, (b) yak\nand (c) mountain\ngoat are adapted to\nmountain habitats\nIf you live in a mountain region or\nhave visited one, you may have seen alarge number of such trees. But, haveyou ever noticed such trees naturally\ngrowing in other regions?\nHow are these trees adapted to the\nconditions prevailing in their habitat?These trees are normally cone shaped\nand have sloping branches. The leavesof some of these trees are needle-like.\nThis helps the rainwater and snow to\nslide off easily. There could be trees withshapes very different from these that are(a)\n(b)\n(c)\nRationalised 2023-24\n64 SCIENCEincluding feet and toes. This protects its\nfeet from the cold when it walks on thesnow. The mountain goat has strong\nhooves for running up the rocky slopes\nof the mountains.\nAs we go up in the mountainous\nregions, the surroundings change andwe see different kinds of adaptations atdifferent heights.\nGrasslands\nA lion lives in a forest or a grassland\nand is a strong animal that can hunt\nand kill animals like deer. It is lightbrown in colour. Look at the picture of\na lion and that of a deer (Fig. 6.8). How\nare the eyes placed in the face for thesetwo animals? Are they in the front or\non the side of the face? Lions have long\nclaws in their front legs that can bewithdrawn inside the toes. Do the\nfeatures of a lion help it in any way tosurvive? It’s light brown colour helps it\nto hide in dry grasslands when it huntsfor prey (animals to eat). The eyes in\nfront of the face allow it to have a correctidea about the location of its prey.\nA  deer is another animal that lives in\nforests and grasslands. It has strong teethfor chewing hard plant stems of theforest.  A  deer needs to know about the\npresence of predators  ( animals like lion\nthat make it their prey ) in order to run\naway from them and not become their\nprey. It has long ears to  hear movements\nof predators . The eyes on the side of its\nhead allow it to look in all directions for\ndanger.  The speed of the deer helps them\nto run away from the predators.\nThere are many other features of a\nlion, a deer or other animals and plantsthat help them to survive in theirhabitat.\nSome Aquatic Habitats\nOceansWe already discussed how fish are\nadapted to live in the sea. Many other\nsea animals have streamlined bodies tohelp them move easily in water. There\nare some sea animals like squids and\noctopus, which do not have thisstreamlined shape. They stay deeper in\nthe ocean, near the seabed and catch\nany prey that moves towards them.However, when they move in water they\nmake their body shapes streamlined.\nThese animals have gills to help themuse oxygen dissolved in water.\nThere are some sea animals like\ndolphins and whales that do not have\nFig. 6.8  (a) Lion and (b) deer\n(a)\n(b)\nRationalised 2023-24\n65 THE LIVING ORGANISMS  — C HARACTERISTICS  AND HABITATSgills. They breathe in air through\nnostrils or blowholes that are locatedon the upper parts of their heads. This\nallows them to breathe in air when they\nswim near the surface of water. They canstay inside the water for a long time\nwithout breathing. They come out to the\nsurface from time to time, to breathe inair. Did you ever see this interesting\nactivity of dolphins in television\nprogramme or films on ocean life?\nPonds and lakes\nHave you seen plants growing in ponds,\nlakes, rivers and even some drains? Go\non a field trip to a nearby pond, if possible,\nand try to observe the kinds of plants thatare seen there. Observe the leaves, stems\nand roots of these plants.\nSome of these plants have their roots\nfixed in the soil below the water(Fig. 6.9). In terrestrial plants, roots\nnormally play a very important role in theabsorption of nutrients and water from\nthe soil. However, in aquatic plants, roots\nare much reduced in size and their mainfunction is to hold the plant in place.\nThe stems of these plants are long,\nhollow and light. The stems grow up tothe surface of water while the leaves and\nflowers, float on the surface of water.\nSome aquatic plants are submerged\nin water. All parts of such plants areunder water. Some of these plants have\nnarrow and thin ribbon-like leaves.These can bend in the flowing water. In\nsome submerged plants, leaves are often\nhighly divided, through which the watercan easily flow without damaging them.\nFrogs usually live in ponds. Frogs\ncan stay both inside the water as wellas move on land. They have strong back\nlegs that help them in leaping and\ncatching their prey.  They have webbedfeet which help them swim in water.\nWe have discussed only a few common\nanimals and plants compared to the widevariety that live in different habitats. You\nmay have also noticed the very wide\nvariety in plants around you, when youprepared a herbarium as part of the\nsuggested activities in Chapter 4.\nImagine the kind of variety that youcould see in a herbarium of leaves of\nplants from all regions of the Earth!\n6.4 C HARACTERISTICS  OF ORGANISMS\nWe went on a journey through differenthabitats and discussed many plants andFig. 6.9 Some aquatic plants float on water.\nSome have their roots fixed in the soil at the\nbottom. Some aquatic plants are\nsubmerged in water.\nRationalised 2023-24\n66 SCIENCEanimals. In Activity 1, we listed objects,\nplants and animals found in differentsurroundings. Suppose we stop a while\nand think which examples in our list\nare living? Let us think of examples froma forest. Trees, creepers, small and big\nanimals, birds, snakes, insects, rocks,\nsoil, water, air, dry leaves, dead animals,mushrooms and moss may be only some\nof the objects that are present in the\nforest. Which of these are living?\nThink of objects that you can see\naround you at this moment and groupthem as living and non-living. In somecases, it is easy for us to know. For\nexample, we know that objects like chair\nor table are not alive. Paheli was readingthis rhyme from Complete Nonsense\nwritten by Edward Lear:Paheli and Boojho found the poem\nvery funny, because they knew that achair or a table is not alive and it cannot\ntalk or walk.\nChair, table, stone or a coin are not\nalive. Similarly, we do know that we arealive and so are all the people of the\nworld. We also see animals around usthat are so full of life — dogs, cats,\nmonkeys, squirrels, insects and many\nothers.\nHow do we know that something is\nliving? Often, it is not so easy to decide.We are told that plants are living, butthey do not move like a dog or a pigeon.\nOn the other hand, a car or a bus can\nmove, still we consider them as non-living. Plants and animals appear to\ngrow in size with time. But then, at\ntimes, clouds in the sky also seem togrow in size. Does it mean that clouds\nare living? No! So, how does one\ndistinguish between living and non-living things? Do living things have\nsome common characteristics that\nmake them very different from thenon-living?\nYou are a wonderful example of a living\nbeing. What characteristics do you have\nwhich make you different from a non-\nliving thing? List a few of thesecharacteristics in your notebook. Look atyour list and mark those characteristics\nthat you have listed, which may also be\nfound in animals or plants.\nSome of these characteristics are\nperhaps common to all living things.\nSaid the Table to the Chair,\n’You can hardly be aware,’How I suffer from the heat,’And from chilblains on my feet!’If we took a little walk,’We might have a little talk!’Pray let us take the air!’Said the Table to the Chair.Said the Chair to the table,’Now you know we are not able!’How foolishly you talk,’When you know we cannot walk!’\nSaid the Table with a sigh,’It can do no harm to try,’I’ve as many legs as you,’Why can’t we walk on two?’\nRationalised 2023-24\n67 THE LIVING ORGANISMS  — C HARACTERISTICS  AND HABITATS\nnoticed pups grow\ninto adults. A chick\nhatched from an\negg, grows intoa hen or a cock.(Fig. 6.11).\nPlants also grow.\nLook around youand see a few plantsof a particular type.\nSome are very small\nand young, someare bigger. Theymay all be in different stages of growth.\nLook at the plants after a few days and\nweeks. You may find that some of themhave grown in size. Growth seems to becommon to all living things.\nDo you think, non-living things show\ngrowth?\nDo all organisms respire?\nCan we live without breathing? Whenwe inhale, the air moves from outside tothe inside of our body. When we breathe\nout, the air moves from inside our body\nto outside. Breathing is part of a processcalled respiration . In respiration, some\nof the oxygen of the air we breathe in, is\nused by the body. We breathe out carbon\ndioxide produced in this process.\nThe process of breathing in animals\nlike cows, buffaloes, dogs or cats is\nsimilar to humans. Observe any one of\nthese animals while they are taking rest,and notice the movement of theirabdomen. This slow movement indicates\nthat they are breathing.\nDo all organisms need food?\nEarlier, we learnt that all living things\nneed food and how essential it is to\nanimals and to us. We have also learnt\nthat plants make their own food by theprocess of photosynthesis. Animals\ndepend on plants or other animals for\ntheir food.\nFood gives organisms the energy\nneeded for them to grow. Organisms alsoneed energy for other life processes thatgo on inside them.\nDo all organisms show\ngrowth?\nDoes the  kurta  you had four years back,\nstill fit you? You cannot wear it any\nmore, isn’t it? You must have growntaller during these years. You may not\nrealise it, but you are growing all the\ntime and in few more years you willbecome an adult. (Fig. 6.10).\nYoung ones of animals also grow\ninto adults. You would surely have\nFig. 6.10  A baby grows into an adultFig. 6.11  A chicken\ngrows into an adult\nRationalised 2023-24\n68 SCIENCERespiration is necessary for all living\norganisms. It is through respiration that\nthe body finally obtains energy from the\nfood it takes.\nSome animals may have different\nmechanisms for the exchange of gases,which is a part of the respiration process.\nFor example, earthworms breathethrough their skin.  Fish, we have learnt,\nhave gills for using oxygen dissolved in\nwater. The gills absorb oxygen from theair dissolved in water.\nDo plants also respire?  Exchange of\ngases in plants mainly takes placethrough leaves. The leaves take in air\nthrough tiny pores in them and use the\noxygen. They give out carbon dioxide tothe air.\nWe learnt that in sunlight, plants\nuse carbon dioxide to produce food andgive out oxygen. The amount of oxygen\nreleased in the process of food\npreparation by plants is much morethan the oxygen they use in respiration.\nRespiration in plants take s place day\nand night.\nDo all organisms respond to\nstimuli?\nHow do you respond, if you suddenly\nstep on a sharp object like a thorn, whilewalking barefoot? How do you feel when\nyou see or think about your favourite\nfood? You suddenly move from a darkplace into bright sunlight. What\nhappens? Your eyes shut themselves\nautomatically for a moment tillthey adjust to the changed brightsurroundings. Your favourite food,bright light and a thorn, in the abovesituations are some examples of changes\nin your surroundings. All of us respond\nimmediately to such changes. Changesin our surroundings that makes us\nrespond to them, are called stimuli.\nDo other animals also respond to\nstimuli? Observe the behaviour ofanimals, when food is served to them.\nDo you find them suddenly becomingactive on seeing the food? When you\nmove towards a bird, what does it do?\nWild animals run away when brightlight is flashed towards them. Similarly,\ncockroaches begin to move to their\nhiding places if the light in the kitchenis switched on at night. Can you give\nsome more examples of responses of\nanimals to stimuli?\nDo plants also respond to stimuli?\nFlowers of some plants bloom only atnight. In some plants flowers close aftersunset. In some plants like Mimosa,\ncommonly known as ‘touch-me-not’,\nleaves close or fold when someonetouches them. These are some examples\nof responses of plants towards changes\nin their surroundings.\nActivity 4\nPlace a potted plant in a room a littleaway from a window through whichsunlight enters some time during the\nday (Fig. 6.12). Continue watering the\nplant for a few days. Does the plant growupright, like plants out in the open?\nNote the direction in which it bends, if\nRationalised 2023-24\n69 THE LIVING ORGANISMS  — C HARACTERISTICS  AND HABITATSit is not growing upright. Do you think,\nthis may be in response to somestimulus?\nAll living things respond to changes\naround them.\nLiving organisms and excretion\nAll organisms need food.  Not all the\nfood that is eaten is completely used,\nonly a part of it is utilised by the body.What happens to the rest? This has to\nbe removed from the body as wastes. Our\nbody produces some wastes in other lifeprocesses also. The process of getting\nrid of wastes by organisms is known as\nexcretion .\nDo plants also excrete? They do, but\nnot as seen in animals. The mechanismsin plants are a little different. Some plantsfind it possible to store the waste products\nwithin their parts in a way that they do\nnot harm the plant as a whole. Someplants remove waste products as\nsecretions.\nExcretion is another characteristic\ncommon to all organisms.Animals reproduce their own kind.\nThe mode of reproduction may be\ndifferent, in different animals. Someanimals produce their young ones\nthrough eggs.  Some animals give birth\nto the young ones (Fig. 6.14).\nPlants also reproduce. Like animals,\nplants also differ in their mode ofreproduction. Many plants reproducethrough seeds. Plants produce seeds,\nFig. 6.13 (a) Birds lay eggs which after hatching\nproduce (b) young ones(a) (b)\nFig. 6.12 Plant respond to lightDo all organisms\nreproduce their ownkind?\nHave you ever seen nests of\nsome birds like pigeons?\nMany birds lay their eggs in\nthe nest. Some of the eggs hatch and\nyoung birds come out of them\n(Fig. 6.13).\nFig. 6.14  Some animals which give birth to\ntheir young ones\nRationalised 2023-24\n70 SCIENCELiving things produce more of their\nown kind through reproduction . It\ntakes place in many different ways, for\ndifferent organisms.\nDo all organisms move?\nIn Chapter 6, we discussed the various\nways in which animals move. They movefrom one place to another and also show\nother body movements.\nWhat about plants? Do they also\nmove? Plants are generally anchored insoil so they do not move from one place\nto another. However, various substances\nlike water, minerals and the foodsynthesised by them move from one part\nof the plant to other. Have you noticed\nany other kind of movement in plants?Opening or closing of flowers? Do you\nrecall how some plants show movement\nin response to certain stimuli?\nWe also have some non-living\nthings moving, of course. A bus, car, asmall piece of paper, clouds and so on.Is there something different in these\nmovements from the movements of\nliving beings?\nThere is such a variety of living\norganisms, but, all of them show somecommon characteristics, as we havediscussed. Yet another common\ncharacteristic is that living beings die.\nBecause organisms die, particular typesof organisms can survive over thousands\nof years only if they reproduce their own\nkind. One single organism maydie without ever reproducing, but, the\ntype of organism can exist only if there\nis reproduction.\nFig. 6.15  A  seed from a plant germinates into a\nnew plant\nwhich can germinate and grow into newplants (Fig.6.15).\nSome plants also reproduce through\nparts other than seeds. For example, apart of a potato with a bud, grows into a\nnew plant (Fig. 6.16).\nPlants also reproduce through\ncuttings. Would you like to grow a plant\nin this way yourself?\nActivity 5\nTake a cutting from a rose or a menhdi\nplant. Fix it in the soil and water it\nregularly. What do you observe, after a\nfew days?\nIt may not be easy to grow plants from\ncuttings. Do not be disappointed if your\ncutting does not grow. Talk to a gardener,if possible, on the care to be given to\ncuttings to make them grow into plants.Fig. 6.16  A new plant grows from a bud of  potato\nRationalised 2023-24\n71 THE LIVING ORGANISMS  — C HARACTERISTICS  AND HABITATSn o i t a t p a d A\nt a t i b a h c i t a u q A\nt n e n o p m o c c i t o i B\nn o i t e r c x E\nh t w o r Gt a t i b a H\ng n i v i L\nn o i t c u d o r p e R\nn o i t a r i p s e R\ns u l u m i t SWe see that, all living things seem to\nhave some common characteristics.\nThey all need food, respire,  respond to\nstimuli, reproduce, show movement,\ngrow and die.\nDo we find some non-living things that\nalso show some of these characteristics?\nCars, bicycle, clocks and the water inthe river move. The moon moves in the\nsky. A cloud grows in size right in front\nof our eyes. Can such things be calledliving? We ask ourselves, do these objects\nalso show all the other characteristics\nof living things?\nIn general, something that is living\nmay have all the characteristics that wehave discussed, while non-living thingsmay not show all these characteristics\nat the same time.\nIs this always true? Do we always find\nthat living things definitely show all thecharacteristics of the living that we have\ndiscussed? Do we always find that non-living things may show only some of these\ncharacteristics and never all of them?\nTo understand this a little better, let\nus look at a specific example. Considerany seed, say, moong. Is it living? It canstay in a shop for months and not show\nany growth or some of the othercharacteristics of life. However, we bring\nthe same seed and plant it in soil, water\nit and it turns into a whole plant. Didthe seed — need food, did it excrete,\ngrow or reproduce when it was in the\nshop for many months?\nWe see that there can be cases when\nwe cannot easily say that a thing has allthe characteristics that we have discussed,for it to be called living.\n“What then is life?”\nPush your hand deep inside a sack of\nwheat. Do you find it is warm inside?There is some heat being produced\ninside the sack of wheat. The seeds\nrespire and in that process give outsome heat.\nWe see that respiration is a process\nthat takes place in seeds even when\nsome of the other life processes may not\nbe very active.\nIt may not be very easy to answer\nour question — “what then is life”?However, looking at all the diversity of\nliving beings around us, we canconclude that “life is beautiful” !\nRationalised 2023-24\n72 SCIENCE\n  The surroundings where plants and animals live, is called their habitat.\n  Several kinds of plants and animals may share the same habitat.\n  The presence of specific features and habits, which enable a plant or an\nanimal to live in a particular habitat, is called adaptation.\n  There are many types of habitats, however, these may be broadly grouped\nas terrestrial (on the land) and aquatic (in water).\n  There is a wide variety of organisms present in different habitats.\n  Plants, animals and microorganisms together constitute biotic\ncomponents.\n  Rocks, soil, air, water, light and temperature are some of the abiotic\ncomponents of our surroundings.\n  Living things have certain common characteristics — they need food,\nthey respire and, excrete, respond to their environment, reproduce, growand show movement.\n1. What is a habitat?\n2. How are cactus adapted to survive in a desert?\n3. Fill up the blanks\n(a) The presence of specific features, which enable a plant or an animal to live\nin a particular habitat, is called                   .\n(b) The habitats of the plants and animals that live on land are called\n                  habitat.\n(c) The habitats of plants and animals that live in water are called\n                 habitat.\n(d) Soil, water and air are the ———— factors of a habitat.\n(e) Changes in our surroundings that make us respond to them, are\ncalled                  .\n4. Which of the things in the following list are nonliving?\nPlough, Mushroom, Sewing machine, Radio, Boat, Water hyacinth, Earthworm\n5. Give an example of a non-living thing, which shows any two characteristics of\nliving things.\n6. Which of the non-living things listed below, were once part of a living thing?\nButter, Leather, Soil, Wool, Electric bulb, Cooking oil, Salt, Apple, Rubber\n7. List the common characteristics of the living things.\n8. Explain, why speed is important for survival in the grasslands for animals\nthat live there. (Hint: There are few trees or places for animals to hide in\ngrasslands habitats.)\nRationalised 2023-24\n73 THE LIVING ORGANISMS  — C HARACTERISTICS  AND HABITATSSUGGESTED PROJECTS AND ACTIVITIES\n1. Many magazines and newspapers talk about possibility of life outside the\nEarth. Read these articles and have a discussion in the class about what\ncould be defined as life outside Earth.\n2. Visit a local zoo and find out what special arrangements are made for the\nanimals that have been brought there from different habitats.\n3. Find out where are the habitats of the polar bear and the penguin. For each\nanimal, explain two ways in which it is well adapted to its habitat.\n4. Find out which animals live in the foot-hills of the Himalayas. Find out if the\ntypes and varieties of animals and plants changes as one goes higher intothe mountain regions of the Himalayas.\n5. Make a habitat album. Try to obtain pictures of animals and plants that you\nhave listed in Activity 1 and paste these under different habitat sections inthe album. Draw the leaf shapes and structures for trees found in thesedifferent regions and include these in the album. In addition, draw thepatterns of branching found in trees of these different regions and includethese also in the album.\nWhat is\nits\nname\nand\nhabitat\nRationalised 2023-24\n";
        const pdfText = content.substring(0, 3000);
        console.log("pdf text value : ", pdfText);
        console.log("done with PDF to Text");

        //Make OpenAI API fetch request

        try {
            const response = await fetch('/api/openaiTeacher', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    grade: selectedGrade,
                    difficulty: selectedDifficulty,
                    typeOfQuestion: selectedTypeOfQuestion,
                    language: selectedLanguage,
                    pdftext: pdfText
                }),
            });
            const responseData = (await response.json()) as any;
            console.log(responseData.responseData);
            setOpenAIResponse(responseData.responseData);
        } catch (error) {
            console.log(error);
        }        

        //Save the data to the database
        const addtoDB = async () => {
            console.log("lessonName : ", lessonName);
            console.log("question : ", openAIResponse);
    
            const docRef = await addDoc(collection(db, "lessons"), {
                lessonName: lessonName,
                grade: selectedGrade,
                difficulty: selectedDifficulty,
                typeOfQuestion: selectedTypeOfQuestion,
                language: selectedLanguage,
                pdfText: pdfText,
                question: openAIResponse,
                time: new Date()
            })
    
            console.log("Document written with ID: ", docRef.id);
            console.log("docref : ", docRef);
    
            await updateDoc(docRef, {
                id: docRef.id,
            })
        }

        await addtoDB();
        console.log("added to database...");

        //Display the data on the teacher dashboard/toast succesfully creation message


    }

    return (
        <div className='m-4'>
            <NavigationTeacher />
            <div className='py-4 flex flex-row justify-between'>
                <h1 className='text-3xl'>Create New Lesson</h1>
            </div>
            <div className='mx-10'>
                <div className='py-2 flex flex-row gap-2 place-items-center'>
                    <h1 className='text-xl'>Topic Name : </h1>
                    <input type='text' value={lessonName} onChange={handleLessonNameChange} className='p-1 border-2' />
                </div>
                <div className='py-2 flex flex-row gap-2 place-items-center'>
                    <h1 className='text-xl'>Grade : </h1>
                    <div className="sm:col-span-3">
                        <div className="mt-2">
                            <select
                                value={selectedGrade}
                                onChange={handleGradeChange}
                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                <option>A+</option>
                                <option>B+</option>
                                <option>C+</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='py-2 flex flex-row gap-2 place-items-center'>
                    <h1 className='text-xl'>Difficulty : </h1>
                    <div className="sm:col-span-3">
                        <div className="mt-2">
                            <select
                                value={selectedDifficulty}
                                onChange={handleDifficultyChange}
                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                <option>Tough</option>
                                <option>Hard</option>
                                <option>Medium</option>
                                <option>Easy</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='py-2 flex flex-row gap-2 place-items-center'>
                    <h1 className='text-xl'>Types of Questions : </h1>
                    <div className="sm:col-span-3">
                        <div className="mt-2">
                            <select
                                value={selectedTypeOfQuestion}
                                onChange={handleTypeOfQuestion}
                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                <option>MCQs</option>
                                <option>Short Answer</option>
                                <option>Long Answer</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='py-2 flex flex-row gap-2 place-items-center'>
                    <h1 className='text-xl'>Language : </h1>
                    <div className="sm:col-span-3">
                        <div className="mt-2">
                            <select
                                value={selectedLanguage}
                                onChange={handleLanguageChange}
                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                <option>English</option>
                                <option>Hindi</option>
                                <option>Marathi</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className="mt-2 w-full flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                            </svg>
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                    <span>Upload a file</span>
                                    <input type="file" className="sr-only" onChange={handleFileSelection}></input>
                                </label>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PDF up to 10MB</p>
                        </div>
                    </div>
                </div>
                <div className='flex py-2 justify-center'>
                    <button onClick={createLesson} className='p-2 px-6 border bg-yellow-400 hover:bg-yellow-500'>Create Lesson</button>
                </div>
            </div>
            <div className='mx-10'>
                <h1 className={`text-3xl`}>Generated Question : </h1>
                <p className={`${roboto.className}`}>{openAIResponse}</p>
            </div>
        </div>
    )
}
