const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [

    {
        question:
        "1. Which of the following is not a data link layer (OSI Layer 2) protocol?",							
        choice1: 'Ethernet',							
        choice2: 'ATM',							
        choice3: 'Cell-Relay',							
        choice4: 'PPP',							
        answer: 3,
        },
        {
        question:							
        "2. Which of the following is not a function of PPP?",							
        choice1: 'Provide support for multiple upper-layer protocols.',							
        choice2: 'Support the connection of multiple devices on a single link.',							
        choice3: 'Support authentication.',							
        choice4: 'Support data integrity via a CRC on frame contents.',							
        answer: 2,
        },
        {
        question:							
        "3. Which of the following ATM AAL types is associated with an incorrect description?",							
        choice1: 'AAL3/4—Connection-oriented service',							
        choice2: 'AAL5—Connectionless service',							
        choice3: 'AAL2—Variable bit rate traffic',							
        choice4: 'AAL1—High bit rate traffic',							
        answer: 4,
        },
        {
        question:							
        "4. Which of the following technologies ensures that a unicast packet is visible only to the device with the specific destination address?",							
        choice1: 'Ethernet',							
        choice2: 'Switched Ethernet',							
        choice3: 'Satellite',							
        choice4: 'Wireless LAN',							
        answer: 2,
        },
        {
        question:							
        "5. The advantage of using multicast packets instead of broadcast packets is:",							
        choice1: 'Broadcasts are received by every host.',							
        choice2: 'Multicast is newer technology.',							
        choice3: 'Broadcasts are processed by every host.',							
        choice4: 'Multicast provides multiple addresses for flexibility.',							
        answer: 3,
        },
        {
        question:							
        "6. A PPP frame has several fields that are not used, like addressing. Why do these fields exist in the frame?",														
        choice1: 'They are reserved for future use.',							
        choice2: 'They are legacy fields from older versions of PPP headers.',							
        choice3: 'PPP is based on the HDLC frame format.',							
        choice4: 'PPP can be adapted for use on multi-point networks and might need the fields.',							
        answer: 3,
        },
        {
        question:							
        "7. ATM uses 53-byte cells, which is quite a bit smaller than the maximum Ethernet frame. What is the purpose of having such a small cell size?",								
        choice1: 'To support latency-sensitive applications like voice traffic',							
        choice2: 'To provide less overhead on ATM switches',							
        choice3: 'To support the use of multiple classes of service',							
        choice4: 'To provide the ability to do switching in hardware',							
        answer: 1,
        },
        {
        question:							
        "8. What is the purpose of the ATM Adaptation Layer?",							
        choice1: 'It determines the amount of data in the cell.',							
        choice2: 'It maps data from upper-layer service classes to ATM cells.',							
        choice3: 'It adapts Ethernet frames to ATM cells.',							
        choice4: 'It wraps a header around the ATM cell.',							
        answer: 2,
        },
        {
        question:							
        "9. What are the two main types of Ethernet frames?",							
        choice1: 'Thinnet and Thicknet',					
        choice2: '10baseT and 100baseT'	,						
        choice3: 'DIX Ethernet and Ethernet II',							
        choice4: '802.3 and Ethernet II',						
        answer: 4,
        },
        {
        question:							
        "10. Which of the following values for the Ethertype/length fields indicates an 802.3 frame (numbers are in decimal)?",							
        choice1: '64',							
        choice2: '1540',						
        choice3: '2048',							
        choice4: '9000',						
        answer: 1,
        },
        {
        question:							
        "11. The original Thicknet standard had a maximum cable length as well as a minimum distance for stations to tap into the cable. Based on the description of CSMA/CD, what is the most likely reason for these distance requirements?",							
        choice1: 'A signal might be too weak to travel farther than the maximum distance.',							
        choice2: 'Every station on the wire had to be able to “detect” a collision in order to function properly.',														
        choice3: 'Too many taps in the cable would weaken the wire.',							
        choice4: 'Thicknet cable came in fixed lengths.',						
        answer: 2,
        },
        {
        question:							
        "12. An Ethernet MAC address consists of ______.",							
        choice1: 'A 4-byte number in four parts',						
        choice2: 'A 4-byte number in two parts',							
        choice3: 'A 6-byte number in two parts'	,						
        choice4: 'A 6-byte number in four parts	',						
        answer: 3,
        },
        {
        question:							
        "13. When an Ethernet station wants to transmit information, the process it follows is ______.",						
        choice1: 'Just start transmitting.',							
        choice2: 'Listen for other stations transmitting; if none, then begin transmitting.',							
        choice3: 'Transmit whenever it receives the token.',							
        choice4: 'Issue a transmit request, and transmit when given authorization to do so.',							
        answer: 2,
        },
        {
        question:							
        "14. What happens when two or more Ethernet stations attempt to transmit at the	same time?",						
        choice1: 'This is impossible on half-duplex.',							
        choice2: 'The signal results in a collision, the stations stop, and the stations all wait the same amount of time to retransmit.',								
        choice3: 'The signal results in a collision, and the stations retransmit based on a configured priority.',							
        choice4: 'The signal results in a collision, and the stations stop and retransmit after	waiting a random amount of time.',						
        answer: 4,
        },
        {						
        question:							
        "15. Which of the following Ethernet standards is not matched correctly?",							
        choice1: '10 Mb Ethernet—Fiber or copper cable',							
        choice2: '100 Mb Ethernet—Fiber or copper cable',							
        choice3: '1 Gig Ethernet—Fiber cable only',							
        choice4: 'All of the above are correct.',
        answer: 3, 
            },
            {
                question:
                "1. Which of the following is not a reason networks built on Ethernet alone cannot scale to a global?",
                choice1: 'Excessive broadcasts would make the network unusable.',
                choice2: 'Ethernet lacks hierarchical addressing.',
                choice3: 'Ethernet switches cannot build forwarding tables.',
                choice4: 'Ethernet cables can only be of a limited length.',
                answer: 3,
                },
                {
                question:
                "2. Which of the following is true about Layer 3 addressing?",
                choice1: 'It is embedded in the device’s firmware.',
                choice2: 'It provides for a logical hierarchy.',
                choice3: 'It allows for duplicate addresses on the Internet.',
                choice4: 'Addresses are not required to be registered if they are used on the Internet.',
                answer: 2,
                },
                {
                question:
                "3. Which of the following is not true about an IP packet?",
                choice1: 'The TTL field ensures that IP packets have a limited lifetime.',
                choice2: 'The maximum size is 65,535 octets.',
                choice3: 'The total length field includes the IP header.',
                choice4: 'The current version is IPv5.',
                answer: 4,
                },
                {
                question:
                "4. Which of the following is a valid host IP address?",
                choice1: '192.168.300.4',
                choice2: '255.70.1.1',
                choice3: '224.0.0.1',
                choice4: '10.254.1.1',
                answer: 4,
                },
                {
                question:
                "5. An IP address has a first octet represented in binary as 11000001; the equivalent in decimal is ______.",
                choice1: '190',
                choice2: '193',
                choice3: '192',
                choice4:' 11,000,001',
                answer: 2,
                },
                {
                question:
                "6. The address 224.100.1.1 under traditional classful addressing would be ______.",
                choice1: 'Class A',
                choice2: 'Class B',
                choice3:' Class C',
                choice4: 'None of the above',
                answer: 4,
                },
                {
                question:
                "7. Which of the following is not a private address?",
                choice1: '172.18.20.4',
                choice2: '10.0.1.1',
                choice3: '200.1.1.254',
                choice4: '192.168.0.1',
                answer: 3,
                },
                {
                question:
                "8. Which of the following is not a reason that subnetting is superior to class-based addressing?",
                choice1: 'It reduces the Internet routing table size.',
                choice2: 'You can identify the host portion of the address without the need for a mask.',
                choice3: 'It creates greater internal address flexibility.',
                choice4: 'It allows for more efficient use of address space.',
                answer: 2,
                },
                {
                question:
                "9. Given a network address of 192.168.100.0/24, what is the maximum number of subnets you can create if each subnet must support at least seven hosts?",
                choice1: '16',
                choice2: '32',
                choice3: '4',
                choice4: '8',
                answer: 1,
                },
                {
                question:
                "10. If your network address is 10.1.0.0/16 and you have subnetworks that all support at least 300 hosts, how many subnets do you have?",
                choice1: '255',
                choice2: '64',
                choice3: '100',
                choice4: '128',
                answer: 4,
                },
                {
                question:
                "11. Which of the following is the correct representation of mask 255.192.0.0?",
                choice1: '/8',
                choice2: '/11',
                choice3: '/10',
                choice4: '/16',
                answer: 3,
                },
                {
                question:
                "12. A network with a /30 mask allows you to have how many usable host addresses?",
                choice1: '4',
                choice2: '2',
                choice3: '6',
                choice4: '0',
                answer: 2,
                },
                {
                question:
                "13. Given the address 10.1.1.0/24, the most correct description of 10.1.1.0 is ______.",
                choice1: 'host 0 on the 10.1.1.0 subnet',
                choice2: 'network 10.1.1.0',
                choice3: 'illegal because 10.0.0.0 is a Class A',
                choice4: 'subnet 10.1.1.0',
                answer: 4,
                },
                {
                question:
                "14. The concept of allowing a single route entry to represent many network addresses is known as ______.",
                choice1: 'CIDR',
                choice2: 'Route aggregation',
                choice3: 'VLSM',
                choice4: 'classless addressing',
                answer: 2,
                },
                {
                question:
                "15. How many subnets can be created from network 10.0.0.0/8 if each subnet must support at least 31 hosts?",
                choice1: '216',
                choice2: '218',
                choice3: '219',
                choice4: '22',
                answer: 2,
                },
                {
                question:
                
                "16. Given network 175.100.0.0/16, if you create four subnets, how many addresses are available on each subnet?",
                choice1: '16,384',
                choice2: '4,096',
                choice3: '16,382',
                choice4: '4,094',
                answer: 3,
                },
                {
                question:
                "17. What is the correct “all hosts” broadcast address for subnet 10.15.0.0/17?",
                choice1: '10.15.255.255',
                choice2: '10.15.0.255',
                choice3: '10.15.127.255',
                choice4: '10.15.128.255',
                answer: 3,
                },
                {
                question:
                "18. Which of the following is not allowed?",
                choice1: 'subnet 10.0.0.0/16',
                choice2: 'subnet 10.255.0.0/16',
                choice3: 'subnet 10.10.10.0/16',
                choice4: 'host 10.10.10.0/32',
                answer: 3,
                },
                {
                question:
                "19. Given network 135.100.0.0/16, you need nine subnets, and of these nine, one subnet needs to be split into 13 additional subnets. Choose the most likely masks you would create for this.",
                choice1: '/20 for the first eight subnets, /23 for the remaining 13',
                choice2: '/20 for the first eight subnets, /24 for the remaining 13',
                choice3: '/24 for all subnets',
                choice4: '/19 for the first eight subnets, /24 for the remaining 13',
                answer: 2,
                },
                {
                question:
                "20. Given network 176.200.0.0/16 and a subnet that supports 4,387 hosts, what is the most likely mask for the subnet?",
                choice1: '/20',
                choice2: '/17',
                choice3: '/21',
                choice4: '/19',
                answer: 4,
                },
                {
                    question:
        "1. Which of the following is a function not performed by a router when forwarding an IP packet?",
        choice1: 'Verify the IP header checksum.',
        choice2: 'Decrement the TTL and ensure that it is not zero.',
        choice3: 'Send a “received” message to the originating router.',
        choice4: 'Remove the existing L2 header and creates a new L2 header before forwarding the IP packet to its next destination.',
        answer: 3,
        },							
        {						
        question: 
        "2. Which of the following highlights the differences between a traditional home user network and the modern home user network?",
        choice1: 'Traditional home networks did not use routers.',
        choice2: 'Modern home networks can use wireless access points.',
        choice3: 'Modern home networks make use of a variety of new services such as Video on Demand and IP telephony.',
        choice4: 'Traditional home networks did not rely on the IP protocol. ',
        answer: 3,
        },							
        {						
        question: 
        "3. In a typical home network, when a PC needs to send an IP packet to a destination on the Internet, it first sends the packet to ______.",
        choice1: 'The designated router',
        choice2: 'The cable modem',
        choice3: 'The router indicated in its BGP table',
        choice4: 'The default gateway',
        answer: 4,
        },							
        {						
        question: 
        "4. Which of the following statements regarding NAT is false?",
        choice1: 'NAT is used for many-to-one translations.',
        choice2: 'NAT is intended to alleviate the need for every home user device to have a public IP address.',
        choice3: 'NAT typically makes use of private IP addressing.',
        choice4: 'A NAT router maintains a translation database to perform the address',
        answer: 1,
        },							
        {						
        question: 
        "5. The process by which a home user’s router requests and receives a public IP address from its service provider is known as ______.",
        choice1: 'ARP',
        choice2: 'DHCP',
        choice3: 'ICMP',
        choice4: 'OSPF',
        answer: 2,
        },							
        {						
        question: 
        "6. Which of the following is false about the DHCP process?",
        choice1: 'The client broadcasts a discover message looking for DHCP servers.',
        choice2: 'All DHCP servers will broadcast an offer message.',
        choice3: 'A client will send a unicast accept message to the first DHCP server it receives a response from.',
        choice4: 'All of the above statements are true.',
        answer: 3,
        },							
        {						
        question: 
        "7. The ping application relies on two common ICMP message types. Which answer is not one of these types?",
        choice1: 'The echo receive ICMP type.',
        choice2: 'The echo request ICMP type.',
        choice3: 'The echo reply ICMP type.',
        choice4: 'None of the above are ICMP message types used by ping.',
        answer: 1,
        },							
        {						
        question: 
       " 8. Which of the following is true regarding ICMP destination unreachable messages?",
        choice1: 'They are sent after failure to receive an Ethernet ACK.',
        choice2: 'They are created by routers that cannot deliver an IP packet to its destination.',
        choice3: 'They rely on the use of ICMP echo replies.',
        choice4: 'They are originated by hosts that are about to reboot.',
        answer: 2,
        },							
        {						
        question: 
        "9.Which of the following is not usually involved in the ARP process when a host needs to send an IP packet to another host not on its own IP subnet?",
        choice1: 'The host needs to determine based on its mask that the destination host is not on its local subnet.',
        choice2: 'The host will issue an ARP request for the MAC address of its default gateway if it is not in its ARP cache.',
        choice3: 'The default gateway will determine if it needs to issue an ARP request for the destination host.',
        choice4: 'The default gateway will issue an ARP request for the MAC address of the originating host.',
        answer: 4,
        },							
        {						
        question: 
        "10. Which of the following is false regarding IP filters?",
        choice1: 'IP filters are not required on a router interface.',
        choice2: 'IP filters can filter on both IP addresses and upper-layer protocol port numbers.',
        choice3: 'IP filters will automatically permit IP packets by default unless otherwise configurechoice4:',
        choice4: 'Only one ingress and one egress filter can be applied per interface.',
        answer: 3,
        },							
        {						
        question: 
        "11.Which of the following is not a match criteria that can be used with IP filters?",
        choice1: 'Source or destination IP address',
        choice2: 'Source or destination port number',
        choice3: 'ICMP message type',
        choice4: 'Originating host name',
        answer: 4,
        },							
        {						
        question: 
        "12.Which of the following is not a valid IP filter command?",
        choice1: 'ip-filter 10 create',
        choice2: 'default-action discard',
        choice3: 'entry 1 create',
        choice4: 'match dst-ip 10.5.1.0/24',
        answer: 2,
        },							
        {						
        question: 
        "13.Which of the following IP filter entries would match packets from network 11.1.1.0/24 to host 5.1.1.1?",
        choice1: 'match src-ip 11.1.1.0/24',
        choice2: 'match dst-ip 5.1.1.1/32',
        choice3: 'A and B together',
        choice4: 'None of the above',
        answer: 3,
        },							
        {						
        question: 
        "14.You are creating a filter to permit packets to destination IP address 192.168.1.1/32. You want all other packets to be dropped.Which of the following commands is not required to support this policy?",
        choice1: 'ip-filter 1 create',
        choice2: 'default-action drop',
        choice3: 'entry 1 create',
        choice4: 'match dst-ip 192.168.1.1/32',
        answer: 2,
        },							
        {						
        question: 
        "15. Which of the following is not displayed with the use of the show filter command?",
        choice1: 'The filter’s default action',
        choice2: 'The interfaces where the filter is applied',
        choice3: 'The number of ingress and egress matches',
        choice4: 'The entries in the filter',
        answer: 2,
        }
                
    
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 20

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()