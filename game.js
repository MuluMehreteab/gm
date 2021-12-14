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
        "1. The original network that ultimately became the Internet was called ______.",							
        choice1: 'NSFNET',							
        choice2: 'ARPANET',							
        choice3: 'DoDnet',							
        choice4: 'DARPA',
        answer:	2,						
        },							                        
        {							
        question: 
        "2. The primary organization behind the development of the original Internet was ______.",							
        choice1: 'IBM',						
        choice2: 'Digital Equipment Corporation (DEC)',						
        choice3: 'Stanford University',						
        choice4: 'U.S. Department of Defense',						
        answer:	4,						
        },							
        {						
        question: 
        "3. Which of the following was not a primary design concern during the development of the original Internet?",						
        choice1: 'Reliability',						
        choice2: 'Bandwidth',						
        choice3: 'Interoperability',						
        choice4: 'Support for diverse network mediums',						
        answer:	2,					
        },							
        {						
        question: 
        "4. Which of the following was not a reason TCP was a superior transport protocol to NCP?",								
        choice1: 'Support for global addressing',						
        choice2: 'Support for end-to-end checksums',						
        choice3: 'Support for applications such as email',						
        choice4: 'Support for fragmentation and reassembly',						
        answer:	3,						
        },							                           
        {						
        question: 
        "5. Which of the following OSI layers is not paired with the correct implementation?",						
        choice1: 'Layer 7—Email',						
        choice2: 'Layer 3—TCP',						
        choice3: 'Layer 4—UDP',						
        choice4: 'Layer 2—PPP',						
        answer:	2,						
        },							
        {						
        question: 
        "6. Part of the growth of the ARPANET was driven by the ability of anyone to create and disseminate information about potential protocols and applications in a particular kind of document. These documents are known as ______.",										
        choice1:'Requests For Information',						
        choice2: 'Protocol Revisions',						
        choice3: 'Requests For Comments',						
        choice4: 'Requests For Configurations',						
        answer:	3,						
        },							                         
        {						
        question: 
        "7. ISPs connect to each other at well-defined network locations to exchange information. These connection points are known as ______.",						
        choice1: 'ISPs',						
        choice2: 'IXPs',						
        choice3: 'BGPs',						
        choice4: 'POPs',						
        answer: 2,
        },
        {						
        question: 
        "8. A company that has locations throughout the country can obtain service at each location from a Tier 1, Tier 2, or Tier 3 provider. What is one reason a company  might choose to connect all locations to a Tier 1 provider despite the higher costs involved?",						
        choice1: 'Sites at different tiers cannot communicate.',						
        choice2: 'Tier 3 providers don’t use TCP/IP.',			                                                                                                                                                   			
        choice3: 'Only Tier 1 providers provide content.',						
        choice4: 'A single provider could offer SLAs to each location.',						
        answer: 4,
        },
        {						
        question: 
        "9. Which of the following services would likely be offered by a content provider but not a service provider?",						
        choice1: 'Standard dial-up service',						
        choice2: 'Live video streaming from sports events',						
        choice3: 'Email service',						
        choice4: 'Basic web services',						
        answer: 2,
        },
        {						
        question: 
        "10. Which of the following accurately describes the TCP protocol?",						
        choice1: 'Connectionless with no guarantee of delivery',						
        choice2: 'Connectionless with guarantee of delivery',						
        choice3: 'Connection-oriented with guarantee of delivery',						
        choice4: 'None of the above',						
        answer: 3,
        },
        {						
        question: 
        "11. Originally the IP protocol functions were performed by ______.",						
        choice1: 'Ethernet',						
        choice2: 'TCP',						
        choice3: 'NCP',						
        choice4: 'ALOHANET',						
        answer: 2,
        },
        {						
        question: 
        "12. When an HTTP packet needs to be forwarded over the Internet, which of the following accurately describes the order of the headers as they would be placed in front of each other in the packet (assume that the originating device is on an Ethernet network)?",				
        choice1:' HTTP, IP, TCP, Ethernet',						
        choice2: 'HTTP, TCP, IP, Ethernet',						
        choice3: 'HTTP, UDP, IP, Ethernet',						
        choice4: 'HTTP, IP, Ethernet',						
        answer: 2,
        },
        {						
        question: 
        "13. A router processing the packet described in Question 12 would need to examine and/or manipulate which headers?",					
        choice1: 'Ethernet only',						
        choice2: 'IP only',						
        choice3: 'TCP and IP only',						
        choice4: 'IP and Ethernet only',						
        answer: 4,
        },
        {						
        question: 
        "14. What would a router processing the packet described in Question 12 do with the	Layer 2 header of the incoming packet?",					
        choice1: 'Remove the source Layer 2 address, add its own, and forward the packet.',						
        choice2: 'Remove the Layer 2 addresses and replace them with new addresses.',						
        choice3: 'Remove the entire Layer 2 header and create a new one based on the next-hop interface.',						
        choice4: 'Leave the original Layer 2 header but forward the packet based on the destination address',						
        answer: 3,
        },
        {						
        question: 
        "15. Most of the OSI-created protocols are no longer in use, although a few still provide some critically important functions. Which of the following describes an OSI protocol that is still in use?",												
        choice1: 'OSPF',						
        choice2: 'LDP',						
        choice3: 'TP0',						
        choice4: 'IS-IS',						
        answer: 4,
        },
        {
            question:
            "1. Which of the following is not a product in the Alcatel-Lucent 7750 SR/7450 ESS family?",
            choice1: 'SR-12',
            choice2: 'ESS-7',
            choice3: 'SR-6',
            choice4: 'ESS-1',
            answer: 3,
            },
            {
            question:
            "2. Which of the following statements is false regarding the Alcatel-Lucent 7450 ESS series?",
            choice1: 'It supports multiple chassis types.',
            choice2: 'It supports OSFP, IS-IS, RIP, and BGP.',
            choice3: 'It is used primarily for Ethernet aggregation.',
            choice4: 'It can be managed via a console port or a dedicated Ethernet port on the SF/CPM.',
            answer: 2,
            },
            {
            question:
            "3. Which of the following descriptions is correct?",
            choice1: 'bof.cfg—7750/7450 configuration file',
            choice2: 'cpm.tim—IOM image file',
            choice3: 'config.cfg—Back-up configuration file',
            choice4: 'boot.ldr—Bootstrap image file',
            answer: 4,
            },
            {
            question:
            "4. Which of the following commands is not correctly described?",
            choice1: 'shutdown—This command is used to disable an interface or protocol.',
            choice2: 'exit all—Logs out of the Alcatel-Lucent 7750 SR/7450 ESS device.',
            choice3: '?—Lists all commands in the current context.',
            choice4: '[TAB]—This command is used for assistance with command completion.',
            answer: 2,
            },
            {
            question:
            "5. Which of the following is not a log stream type?",
            choice1: 'Audit',
            choice2: 'Change',
            choice3: 'Main',
            choice4: 'Security',
            answer: 1,
            },
            {
            question:
            "6. Which of the following descriptions of hardware for the Alcatel-Lucent 7750 SR/7450 ESS is correct?",
            choice1: 'IOMs plug into MDAs.',
            choice2: 'MDAs plug into SFPs.',
            choice3: 'SF/CPMs plug into IOMs.',
            choice4: 'IOMs plug into the chassis.',
            answer: 4,
            },
            {
            question:
            "7. What file contains the system bootstrap image?",
            choice1: 'boot.cfg',
            choice2: 'image.ldr',
            choice3: 'boot.ldr',
            choice4: 'bof.cfg',
            answer: 3,
            },
            {
            question:
            "8. The SF/CPM card has its own Ethernet interface for out-of-band management. This interface has its own IP address and default route. Where is this information stored?",
            choice1: 'boot.ldf',
            choice2: 'bof.cfg',
            choice3: 'config.cfg',
            choice4: 'cpm.tim',
            answer: 2,
            },
            {
            question:
            "9. Which of the following correctly lists the order in which files are read by the Alcatel-Lucent 7750 SR/7450 ESS upon bootup?",
            choice1: 'boot.ldr, bof.cfg, system image, config.cfg',
            choice2: 'system image, boot.ldr, config.cfg, bof.cfg',
            choice3: 'boot.ldr, system image, bof.cfg, config.cfg',
            choice4: 'boot.ldr, bof.cfg, config.cfg, system image',
            answer: 1,
            },
            {
            question:
            "10. During the boot process, an Alcatel-Lucent 7750 SR/7450 ESS checks to see if persistence is enablechoice4: 'What is the purpose of persistence?",
            choice1: 'To ensure that the system saves routing table information when it reboots',
            choice2: 'To ensure that changes to the bof.cfg are saved',
            choice3: 'To ensure synchronization with the 5620 SAM',
            choice4: 'To ensure that config changes are stored in the config.cfg',
            answer: 3,
            },
            {
            question:
            "11. What command would you use to enable an interface the first time you initialized an Alcatel-Lucent 7750 SR/7450 ESS?",
            choice1: 'enable',
            choice2: 'no shutdown',
            choice3: 'interface enable',
            choice4: 'interface on',
            answer: 2
            },
            {
            question:
            "12. Which of the following is the correct provisioning order you should follow when configuring an Alcatel-Lucent 7750 SR/7450 ESS for the first time?",
            choice1: 'IOM, port, MDA',
            choice2: 'Port, MDA, IOM',
            choice3: 'IOM, MDA, port',
            choice4: 'MDA, port, IOM',
            answer: 3,
            },
            {
            question:
            "13. Which of the following is false regarding the logging mechanisms in the AlcatelLucent 7750 SR/7450 ESS?",
            choice1: 'Log-ids 99 and 100 are reserved for system usage.',
            choice2: ' You must configure at least one input stream for a log-id',
            choice3: 'You must configure a filter for each log-id',
            choice4: 'You must configure the destination for the events from the log-id',
            answer: 3,
            },
            {
            question:
            "14. What command would you use to display the configuration of your Alcatel-Lucent 7750 SR/7450 ESS?",
            choice1: 'show config',
            choice2: 'admin display-config',
            choice3: 'display config',
            choice4: 'show admin config',
            answer: 2,
            },
            {
            question:
            "15. Which of the following values is not stored in the bof.cfg?",
            choice1: 'The location of the primary boot image',
            choice2: 'The list of IOM cards in the chassis',
            choice3: 'The persist value',
            choice4: 'The location of the primary config file',
            answer: 2,
            },
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
            "4. Which of the following is not true of the STP protocol?",
            choice1: 'It calculates a root bridge.',
            choice2: 'It uses a cost value on each port to determine the path to the root bridge.',
            choice3: 'It ensures a loop-free topology.',
            choice4: 'It provides load-sharing capability.',
            answer: 4,
            },
            {
            question:
            "5. The advantage of using VLANs is ______.",
            choice1: 'They can increase the security of your network.',
            choice2: 'They can interconnect multiple broadcast domains.',
            choice3: 'They can limit the amount of broadcast traffic between groups of devices.',
            choice4: 'A and C but not B',
            answer: 4,
            },
            {
            question:
            "6. Which of the following statements is false?",
            choice1: 'Routers provide broadcast domain separation.',
            choice2: 'Hubs provide collision domain separation.',
            choice3: 'VLANs provide broadcast domain separation.',
            choice4: 'Switches provide collision domain separation.',
            answer: 2,
            },
            {
            question:
            "7. The method that LAGs use to provide load balancing is best described as:",
            choice1: 'Aggregates all source/destination conversations into a single conversation equally across all links',
            choice2: 'Uses the same physical link for each source/destination conversation',
            choice3: 'Statistically balances conversations based on the source MAC address',
            choice4: 'Distributes egress frames equally across all links in the bundle',
            answer: 2,
            },
            {
            question:
            "8. Given the following code:  Config> lag 1;  Config>lag# description “LAG from PE1 to PE2;  Config>lag# port 1/1/1 1/1/2 1/1/3 1/1/4 1/1/5 1/1/6;  Config>lag# port-threshold 2 action down  Config>lag# dynamic-cost; Config>lag# no shutdown;  Which answer correctly describes what happens when Ports 1/1/5 and 1/1/6 fail?",
    
            choice1: 'Nothing because the port threshold of 2 active links has not been reached',
            choice2: 'The LAG begins using equal costing across all links because of the dynamiccost parameter.',
            choice3: 'The LAG updates its BPDUs and recalculates STP.',
            choice4: 'The LAG changes its OSPF cost for the bundle but takes no other action.',
            answer: 4,
            },
            {
            question:
            "9. What is the primary reason that Ethernet switched networks require STP?",
            choice1: 'STP provides for link backup between switches.',
            choice2: 'A loop-free topology is more efficient.',
            choice3: 'Redundant paths can lead to broadcast storms and FDB instability.',
            choice4: 'STP updates the OSPF routing protocol cost upon link failure.',
            answer: 3,
            },
            {
            question:
            "10. The mechanism that STP uses to prevent loops in an Ethernet switched network is ______.",
            choice1: 'STP elects a root and selectively blocks higher cost paths to the root from each bridge.',
            choice2: 'STP blocks ports on all bridges that are not the root bridge.',
            choice3: 'STP proactively changes all paths to the root bridge so that they are equal cost.',
            choice4: 'STP uses BPDUs to set up a virtual path between each source and destination pair.',
            answer: 1,
            },
            {
            question:
            "11. What determines how the root bridge is elected?",
            choice1:'The bridge priority',
            choice2: 'The MAC address of the lowest switch port',
            choice3: 'The bridge priority unless there is a tie, and then the lowest MAC address',
            choice4: 'The BID unless there are multiple bridge priorities that are equal',
            answer: 3,
            },
            {
            question:
            "12. What distinguishes an alternate port from a back-up port in STP?",
            choice1: 'The alternate port has a higher path to the root.',
            choice2: 'The back-up port has a lower priority.',
            choice3: 'The back-up port is used only when the alternate port fails.',
            choice4: 'The back-up port is on the same switch as the designated switch.',
            answer: 4,
            },
            {
            question:
            "13. Which of the following is false regarding VLANs?",
            choice1:' They provide for broadcast domain separation.',
            choice2: 'A single VLAN can exist on multiple switches.',
            choice3: 'They require a separate physical connection per VLAN for interswitch links.',
            choice4: 'They use a 12-bit VLAN ID to identify each VLAN.',
            answer: 3,
            },
            {
            question:
            "14. Which STP port state is characterized by the port accepting and recording MAC address information, but not forwarding any frames out the port?",
            choice1: 'Blocking',
            choice2: 'Forwarding',
            choice3: 'Listening',
            choice4: 'Learning',
            answer: 4,
            },
            {
            question:
            "15. The technology that allows multiple customers with the same VLANs to use the same provider backbone for their Ethernet traffic is known as ______.",
            choice1: 'VLAN trunking',
            choice2: 'VLAN tunneling',
            choice3: 'VLAN stacking',
            choice4: 'IEEE 802.1',
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
        },
        {
            question:
            "1. Which of the following is not a transport layer protocol?",
            choice1: 'TP4',
            choice1: 'TP4',
            choice2: 'TCP',
            choice3: 'RTP',
            choice4: 'UDP',
            answer: 3,
            },							
            {						
            question: 
            "2. Which of the following statements about transport layer protocols is false?",
            choice1: 'Most Internet applications use a transport layer protocol.',
            choice2: 'Transport layer protocols can provide both reliable and unreliable services.',
            choice3: 'Transport layer protocols provide end-to-end services for applications.',
            choice4: 'Transport layer protocols require additional software be added to your operating system.',
            answer: 4,
            },							
            {						
            question: 
            "3. Which of the following is not a characteristic of the TCP protocol?",
            choice1: 'Reliable data transfer',
            choice2: 'Connectionless operation',
            choice3: 'Flow control supported',
            choice4: 'Full-duplex operation',
            answer: 2,
            },							
            {						
            question: 
            "4. Which of the following is not a characteristic of the UDP protocol?",
            choice1: 'Reliable data transfer',
            choice2: 'Connectionless operation',
            choice3: 'No flow control',
            choice4: 'Appropriate for real-time traffic',
            answer: 1,
            },							
            {						
            question: 
            "5. Which of the following TCP flags is not matched with the correct definition?",
            choice1: 'SYN—Indicates the start of a TCP connection.',
            choice2: 'ACK—Acknowledges that a TCP segment has been received.',
            choice3: 'FIN—Indicates the closing of a TCP session.',
            choice4: 'RST—Re-sets the sequence numbers for a TCP session.',
            answer: 4,
            },							
            {						
            question: 
            "6. A TCP sequence or acknowledgment number consists of ______ bits.",
            choice1: '30',
            choice2: '64',
            choice3: '24',
            choice4: '32',
            answer: 4,
            },							
            {						
            question: 
            "7. After a client initiates a connection request to a server with the SYN bit set, the server usually responds with a packet that has the ______ bit set.",
            choice1: 'SYN',
            choice2: 'ACK',
            choice3: 'SYN and ACK',
            choice4: 'SYN, ACK, and URG',
            answer: 3,
            },							
            {						
            question: 
            "8. Which of the following TCP bits is set to indicate that an application wishes to close an open connection?",
            choice1: 'RST',
            choice2: 'FIN',
            choice3: 'URG',
            choice4: 'AC',
            answer: 2,
            },							
            {						
            question: 
            "9. When operating in slow start mode, which of the following describes the mechanisms to throttle the amount of data sent?",
            choice1: 'The receiver’s advertised window size',
            choice2: 'The sender’s congestion window and the sender’s advertised window size',
            choice3: 'The sender’s congestion window and the receiver’s advertised window size',
            choice4: 'The maximum segment size and the URG pointer',
            answer: 3,
            },							
            {											
            question: 
            "10. Which of the following are possible mechanisms by which a TCP sending process could recognize that packets it sent to a receiver had been dropped by the network?",
            choice1: 'An RSND bit from the receiving TCP process',
            choice2: 'Duplicate ACK numbers',
            choice3: 'An advertised window size of 0',
            choice4: 'An ICMP source quench message',
            answer: 2,
            },							
            {						
            question: 
            "11. Given the values MSS=1000 bytes, cwnd value=6, window size=5000, and sender’s SN=5000, what will be the ACK number from the receiving station after the sender sends its next set of segments to the receiving station?",
            choice1: '6000',
            choice2: '11001',
            choice3: '11000',
            choice4: '10000',
            answer: 4,
            },							
            {						
            question: 
            "12. Which of the following types of applications would be least likely to use the UDP protocol?",
            choice1: 'A “request-response” application',
            choice2: 'An application that is sensitive to packet loss',
            choice3: 'An application that is sensitive to delay',
            choice4: 'A real-time application',
            answer: 2,
            },							
            {						
            question: 
            "13. TCP provides many advanced features missing from UDP. Which of the following is an advantage that UDP has over TCP?",
            choice1: 'It provides reliable data transfer.',
            choice2: 'It can recover gracefully from packet loss.',
            choice3: 'It reacts to network congestion.',
            choice4: 'It adds little overhead to the data transfer.',
            answer: 4,
            },							
            {						
            question: 
            "14. Which of the following is least likely to be used as an ephemeral port?",
            choice1: '1025',
            choice2: '53212',
            choice3: '1487',
            choice4: '65938',
            answer: 4,
            },							
            {						
            question: 
            "15. DNS is a unique protocol in terms of its transport selection because simple name lookups use UDP, while “zone transfers” that transfer a large amount of name resolution information from one DNS server to another use TCP. What is the least likely reason for using this approach?",
            choice1: 'Name lookups are simple request-response.',
            choice2: 'TCP is a reliable protocol.',
            choice3: 'An unreliable zone transfer could result in serious name resolution discrepancies in a network.',
            choice4: 'UDP cannot be used for bulk file transfers',
            answer: 4,
            },
            {
                question:
                "1. An IP router normally uses which of the following pieces of information to forward an IP packet?",
                choice1: 'The destination IP address only',
                choice2: 'The source and destination IP address',
                choice3: 'The destination IP address and the destination TCP port',
                choice4: 'The destination IP address, the TTL, and the ToS',
                answer: 1,
                },							
                {						
                question: 
                "2. The two main categories of routing protocols are IGP and ______.",
                choice1: 'OSPF',
                choice2: 'Link state',
                choice3: 'BGP',
                choice4: 'EGP',
                answer: 4,
                },							
                {
                question: 
                "3. Which of the following is not a characteristic of an IGP?",
                choice1: 'It is intended for networks under a common administrative control.',
                choice2: 'It is used between ASes.',
                choice3: 'There are not as many policy enforcement features as an EGP.',
                choice4: 'It includes distance vector and link state protocols.',
                answer: 2,
                },							
                {
                question:
                "4. A router can run multiple routing protocols that each have their own table of routing information. A router selects the best route for each destination from all routing sources and puts them in the ______.",
                choice1: 'Routing Link Database',
                choice2: 'Routing Information Base',
                choice3: 'Routing Table',
                choice4: 'ARP Table',
                answer: 3,
                },							
                {
                question:
                "5. Which of the following pairings is not correct?",
                choice1: 'EGP—BGP4',
                choice2: 'Link state—OSPF',
                choice3: 'IGP—RIP',
                choice4: 'Distance vector—IS-IS',
                answer: 4,
                },							
                {
                question:
                "6. In which situation would you be most likely to use a static default route?",
                choice1: 'In small networks',
                choice2: 'On links with only a single path to other routers',
                choice3: 'When you have older routers',
                choice4: 'On a low-bandwidth link',
                answer: 2,
                },							
                {
                question:
                "7. It is said that distance vector protocols have a longer convergence time than link state protocols. What is the most likely reason for this?",
                choice1: 'Link state protocols send less information.',
                choice2: 'Link state protocols keep track of neighbors via Hello updates.',
                choice3: 'The shortest path algorithm is much faster to calculate than the calculation performed by a distance vector protocol.',
                choice4: 'Distance vector protocols rely on updates only from neighbors.',
                answer: 4,
                },							
                {
                question:
                "8. There are many advantages of link state protocols over distance vector protocols. Which of the following is a potential advantage of distance vector?",
                choice1: 'Distance vector sends its entire routing table in updates.',
                choice2: 'Distance vector does not require extensive processing to build the routing table.',
                choice3: 'Distance vector sends updates at timed intervals.',
                choice4: 'Distance vector relies on neighbors to report routing updates.',
                answer: 2,
                },							
                {
                question:
                "9. When a link state router receives an LSP update, it uses what algorithm to calculate its routing table?",
                choice1: 'OSPF',
                choice2: 'Spanning tree',
                choice3: 'SPF',
                choice4: 'Least cost',
                answer: 3,
                },							
                {
                question:
                "10. Which of the following is most likely to be used for forwarding IP packets from a stub network?",
                choice1: 'A static route',
                choice2: 'A default route',
                choice3: 'A floating static route',
                choice4: 'OSPF with the “stub area” feature',
                answer: 2,
                },							
                {
                question:
                "11. The forwarding of packets on a router is a function of the data plane. The use of a routing protocol to build routing tables is a function of ______.",
                choice1: 'The routing plane',
                choice2: 'The control plane',
                choice3: 'The OSPF plane',
                choice4: 'The protocol plane',
                answer: 2,
                },							
                {
                question:
                "12. Link state protocols flood LSP information throughout the network to each router. These LSPs are stored in ______.",
                choice1: 'The routing table',
                choice2: 'The FIB',
                choice3: 'The routing database',
                choice4: 'The link state database',
                answer: 4,
                },							
                {
                question:
                "13. If there are multiple identical network prefixes advertised by different routing protocols, the Routing Table Manager chooses the route to place in the routing table based on ______.",
                choice1: 'It enters a route based on the lowest metric value.',
                choice2: 'It enters a route based on the highest preference value.',
                choice3: 'It enters a route based on the lowest preference value.',
                choice4: 'It enters a route for each protocol in the routing table.',
                answer: 3,
                },							
                {
                question:
                "14. Using a link state protocol, which of the following best describes the view each router has of all the links in the network after all LSPs have been flooded?",
                choice1: 'Each router has a common view of the network.',
                choice2: 'Each router has a unique view of the network based on its location.',
                choice3: 'Each router knows about only those LSPs originated from its neighbors.',
                choice4: 'Each router knows about all LSPs but uses only LSPs from its neighbors to construct its view.',
                answer: 1,
                },							
                {
                question:
                "15. Which of the following is the most accurate explanation of the information a distance vector routing protocol sends to neighboring routers?",
                choice1: 'It sends Hello updates.',
                choice2: 'It sends its entire routing table.',
                choice3: 'It floods LSPs.',
                choice4: 'It sends its entire routing table and its neighbors’ routing tables.',
                answer: 2,
            
                },

                {
                    question:
                    "1. OSPF discovers neighbors ______.",
                    choice1: 'Only by manually configuring the router',
                    choice2: 'By flooding updates',
                    choice3: 'Using Hello advertisements',
                    choice4: 'Using a host table',
                    answer: 3,
                    },							
                    {
                    question:
                    "2. Which of the following is not a feature of the OSPF protocol?",
                    choice1: 'It supports authentication.',
                    choice2: 'It provides a loop-free topology.',
                    choice3: 'It uses the Shortest Path First algorithm.',
                    choice4: 'It uses a hop count–based metric.',
                    answer: 4,
                    },							
                    {
                    question:
                    "3. Which logical interface is recommended for defining a router ID?",
                    choice1: 'Ethernet interface',
                    choice2: 'Chassis interface',
                    choice3: 'MAC address',
                    choice4: 'System interface',
                     answer: 4,
                    },							
                    {
                    question:
                    "4. What is the primary purpose of the OSPF router ID?",
                    choice1: 'To elect a designated router',
                    choice2: 'To uniquely identify an OSPF router',
                    choice3: 'To trace sequence numbers',
                    choice4: 'To support LSA flooding',
                    answer: 2,
                    },							
                    {
                    question:
                    "5. LSA updates are sent in response to network changes and ______.",
                    choice1: 'Every 30 minutes',
                    choice2: 'After the Hello timer expires',
                    choice3: 'When the DR detects the BDR has failed',
                    choice4: 'Every 30 minutes provided new information needs to be transmitted',
                    answer: 1,
                    },							
                    {
                    question:
                    "6. What does it mean to say that two OSPF routers are adjacent?",
                    choice1: 'The routers are physically connected on a point-to-point link.',
                    choice2: 'The routers are on a common network segment and have exchanged database information.',
                    choice3: 'The routers have exchanged Hello packets.',
                    choice4: 'The routers are in a single area.',
                    answer: 2,
                    },							
                    {
                    question:
                    "7. What is required for OSPF routers on a point-to-point network to form an adjacency?",
                    choice1: 'The DR must form an adjacency first.',
                    choice2: 'The neighbor IP address must be configurecd.',
                    choice3: 'They will automatically become adjacent provided certain OSPF configuration values match.',
                    choice4: 'Nothing. OSPF routers on point-to-point links will always become adjacent.',
                    answer: 3,
                    },							
                    {
                    question:
                    "8. Which of the following hello packet values is not involved in the adjacency process on point-to-point links?",
                    choice1: 'The area ID',
                    choice2: 'The priority',
                    choice3: 'The Hello timer',
                    choice4: 'The dead timer',
                    answer: 2,
                    },							
                    {
                    question:
                    "9. In addition to having correct OSPF settings in the Hello packets, another value that can prevent routers from forming an adjacency in the event of a mismatch is ______.",
                    choice1: 'The AS number',
                    choice2: 'The OSPF MTU',
                    choice3: 'The OSPF metric',
                    choice4: 'The MPLS TE',
                    answer: 2,
                    },							
                    {
                    question:
                    "10. The command to display the Link State Updates that a router has received is ______.",
                    choice1: 'show router ospf status',
                    choice2: 'show router ospf links',
                    choice3: 'show router ospf summary',
                    choice4: 'show router ospf database',
                    answer: 4,
                    },							
                    {
                    question:
                    "11. There are many different types of LSAs in OSPF. The most common LSA type in point-to-point networks is ______.",
                    choice1: 'The area LSA',
                    choice2: 'The router LSA',
                    choice3: 'The network LSA',
                    choice4: 'The summary LSA',
                    answer: 2,
                    },							
                    {
                    question:
                    "12. If an OSPF router receives an LSA with a sequence number that is equal to the sequence number it already has for that LSA, it will ______.",
                    choice1: 'Silently drop the LSA.',
                    choice2: 'Send a rejection notice to the sending router.',
                    choice3: 'Drop the LSA and send an acknowledgement.',
                    choice4: 'Drop the LSA and forward it to its adjacent routers.',
                    answer: 3,
                    },							
                    {
                    question:
                    "13. Which of the following is false regarding the Shortest Path First algorithm that OSPF uses?",
                    choice1: 'It determines the optimal route to each network.',
                    choice2: 'It creates a loop-free path to each network.',
                    choice3: 'It is run only on the router that originates an LSA update.',
                    choice4: 'It runs every time a new LSA is received:',
                    answer: 3,
                    },							
                    {
                    question:
                    "14. Which of the following correctly identifies the order of steps for two OSPF routers to become fully adjacent?",
                    choice1: 'Exchange, Loading, SPF, Adjacent',
                    choice2: 'Exchange, ExStart, Loading',
                    choice3: 'ExStart, Exchange, Loading, Full',
                    choice4: 'ExStart, Exchange, Loading, Adjacent',
                    answer: 3,
                    },							
                    {
                    question:
                    "15. Which of the following default metrics is not correct for the given interface speed?",
                    choice1: '1 Gbps link = 100',
                    choice2: '16 Mbps link = 6,250',
                    choice3: '1.544 Mbps link = 64,766',
                    choice4: '622 Mbps link = 16',
                    answer: 4,
                
                               
                    },
                    {
                        question:
                        "1. The primary purpose of an EGP is to ______.",
                        choice1: 'Handle large routing tables.',
                        choice2: 'Distribute routing information between ASes.',
                        choice3: 'Support routing inside a large enterprise network.',
                        choice4: 'Provide a default route to the Internet.',
                        answer: 2,
                        },							
                        {
                        question:
                        "2. Which of the following is false regarding ASes?",
                        choice1: 'The assignment of public AS numbers is controlled by RIRs.',
                        choice2: '65,001 is a private AS number.',
                        choice3: 'An IGP is required for routing within the AS.',
                        choice4: 'The AS usually contain routers under the control of different administrative groups.',
                        answer: 4,
                        },							
                        {
                        question:
                        "3. Which logical interface is preferred for creating internal BGP sessions?",
                        choice1: 'Ethernet interface',
                        choice2: 'Chassis interface',
                        choice3: 'MAC address',
                        choice4: 'System interface',
                        answer: 4,
                        },							
                        {
                        question:
                        "4. Which of the following is true regarding BGP neighbors?",
                        choice1: 'They can be discovered automatically.',
                        choice2: 'They need to be directly connectecd',
                        choice3: 'They can be in the same or different AS.',
                        choice4: 'Not all internal BGP speakers need to have the same information about routes outside the AS.',
                        answer: 3,
                        },							
                        {
                        question:
                        "5. Two BGP routers configured as neighbors communicate using ______.",
                        choice1: 'TCP on a variable port',
                        choice2: 'UDP on a fixed port',
                        choice3: 'TCP on a fixed port',
                        choice4: 'IP using a fixed protocol',
                        answer: 3,
                        },							
                        {
                        question:
                        "6. The primary purpose of iBGP is ______.",
                        choice1: 'To ensure that routers inside an AS have a common view of networks outside the AS',
                        choice2: 'To ensure that the IGP has multiple exit points from an AS',
                        choice3: 'To serve as back-up routers to eBGP',
                        choice4: 'To exchange routes with external ASes',
                        answer: 1,
                        },							
                        {
                        question:"7. By default, BGP will choose the best path to a given network destination based on ______.",
                        choice1: 'The sum of the interface speeds to a destination',
                        choice2: 'The shortest AS path',
                        choice3: 'The AS that is configured with special non-discretionary attributes',
                        choice4: 'The AS that re-distributed the route from OSPF into BGP',
                        answer: 2,
                        },							
                        {
                        question:
                        "8. Once BGP peers establish a connection, they send routing updates to each other using ______.",
                        choice1: 'A keep alive message',
                        choice2: 'A next-hop update',
                        choice3: 'An update message',
                        choice4: 'A networks message',
                        answer: 3,
                        },							
                        {
                        question:
                        "9. By looking only at the BGP configuration statements on two routers, you can tell if they are iBGP peers or eBGP peers because ______.",
                        choice1: 'The statement says iBGP or eBGP.',
                        choice2: 'The statement contains the word internal or external.',
                        choice3: 'Internal peering statements are configured separately. ',
                        choice4: 'The AS number is associated with each peer statement.',
                        answer: 4,
                        },							
                        {
                        question:
                        "10. The command to display the status of your BGP process is ______.",
                        choice1: 'show router bgp process',
                        choice2: 'show router bgp summary',
                        choice3: 'show router bgp info',
                        choice4: 'show router bgp status',
                        answer: 2,
                        },							
                        {
                        question:
                        "11. In the event that a previously advertised network becomes unreachable, BGP will ______.",
                        choice1: 'Advertise the route with a null AS-path.',
                        choice2: 'Tear down the peer connection.',
                        choice3: 'Send a withdraw message.',
                        choice4: 'Update its route table but take no other action.',
                        answer: 3,
                        },							
                        {
                        question:
                        "12. In which of the following situations would you be least likely to use BGP?",
                        choice1: 'A service provider with multiple connections to other providers',
                        choice2: 'An enterprise with multiple connections to the same ISP',
                        choice3: 'An enterprise with multiple connections to different ISPs',
                        choice4: 'A service provider with a single connection to a higher-level ISP',
                        answer: 2,
                        },							
                        {
                        question:
                        "13. The three well-known mandatory attributes in BGP are ______.",
                        choice1: 'Origin, AS-path, and community',
                        choice2: 'AS-path, community, and next-hop',
                        choice3: 'AS-path, peer, and next-hop',
                        choice4: 'AS-path, origin, and next-hop',
                        answer: 4,
                        },							
                        {
                        question:
                        "14. A BGP router usually does not need to receive a full Internet routing table if ______.",
                        choice1: 'It is the single exit point for an AS.',
                        choice2: 'It is one of several exit points from an AS.',
                        choice3: 'It is part of a transit AS.',
                        choice4: 'It is providing updates to downstream providers.',
                        answer: 1,
                        },							
                        {
                        question:
                        "15. All of the following are reasons that using BGP between ASes is preferable to using IGP route re-distribution except ______.",
                        choice1: 'Route re-distribution loses the metrics of the original IGP.',
                        choice2: 'Route re-distribution can lead to routing loops.',
                        choice3: 'BGP provides a consistent interface for route exchange across various ASes.',
                        choice4: 'Route re-distribution provides for greater policy control.',
                        answer: 4,
                    
                                   
                        },
                        {
                            question:
                            "1. Which of the following accurately describes a P device?",
                            choice1: ' It is used exclusively by the customer.',
                            choice2: ' It is responsible for adding and removing labels.',
                            choice3: ' It swaps label information and forwards packets.',
                            choice4: ' It creates an LSP in the provider network.',
                            answer: 2,
                            },							
                            {
                            question:
                            "2. Which of the following is false regarding an SDP?",
                            choice1: ' It provides transport tunnel encapsulation.',
                            choice2: ' It is specific to a single service.',
                            choice3: ' The SDP ID is locally unique.',
                            choice4: ' LDP can be used as the signaling protocol.',
                            answer: 2,
                            },							
                            {
                            question:
                            "3. Which of the following is not an accurate description of a VPN?",
                            choice1: ' A series of point-to-point tunnels configured on client equipment',
                            choice2: ' A tunnel technology created in a provider network',
                            choice3: ' A function of MPLS networks to create private communities of users',
                            choice4: ' Any network that includes encryption',
                            answer: 4,
                            },							
                            {
                            question:
                            "4. Which of the following is false regarding LDP?",
                            choice1: ' It is used to define unidirectional paths through the network.',
                            choice2: ' It is a protocol specifically intended for label distribution.',
                            choice3: ' It is the only method for distributing labels in an MPLS network.',
                            choice4: ' It describes a path through the MPLS network based on the IGP path',
                            answer: 3,
                            },							
                            {
                            question:
                            "5. Which of the following term–definition pairs is incorrect?",
                            choice1: ' Push—Add a label',
                            choice2: ' Swap—Replace a label',
                            choice3: ' Label distribution protocol—Series of labels and next-hop interfaces',
                            choice4: ' Pop—Remove a label',
                            answer: 3,
                            },							
                            {
                            question:
                            " 6. The most commonly used label distribution protocol is ______.",
                            choice1: ' OSPF',
                            choice2: ' BGP',
                            choice3: ' LDP',
                            choice4: ' RIP',
                            answer: 3,
                            },							
                            {
                            question:
                            "7. Which of the following is not a type of VPN?",
                            choice1: ' VPWS',
                            choice2: ' VPNM',
                            choice3: ' VPLS',
                            choice4: ' VPRN',
                            answer: 2,
                            },							
                            {
                            question:
                            "8. A VPN that provides a simple point-to-point service between two destinations. is a ______.",
                            choice1: ' VPNM',
                            choice2: ' VPLS',
                            choice3: ' VPWS',
                            choice4: ' None of the above',
                            answer: 3,
                            },							
                            {
                            question:
                            "9. The VPN service that must maintain a table of MAC addresses is ______. ",
                            choice1: ' VPWS',
                            choice2: ' VPLS',
                            choice3: ' VPRN',
                            choice4: ' Both A and B ',
                            answer: 2,
                            },							
                            {
                            question:
                            "10. The VPN service that requires encryption is ______.",
                            choice1: ' VPRN',
                            choice2: ' VPNM',
                            choice3: ' VPLS',
                            choice4: ' None of the above',
                            answer: 4,
                            },							
                            {
                            question:
                            "11. The VPN service that appears to the customer as a private routed network is ______",
                            choice1: ' VPNM',
                            choice2: ' VPRN',
                            choice3: ' VPLS',
                            choice4: ' VPWS',
                            answer: 2,
                            },							
                            {
                            question:
                            "12. As a packet traverses an MPLS network, it passes through a router that removes one label and replaces it with another. The router it passed through was a ______ router.",
                            choice1: ' PE',
                            choice2: ' CE',
                            choice3: ' LER',
                            choice4: ' P',
                            answer: 4,
                            },							
                            {
                            question:
                            "13. A packet arrives at a router with a label, and the router cannot perform any operations on it. The router is most likely a ______.",
                            choice1: ' LSR',
                            choice2: ' PE',
                            choice3: ' LER',
                            choice4: ' None of the above',
                            answer: 4,
                            },							
                            {
                            question:
                            "14. In an MPLS network, the customer routers have no knowledge of how the MPLS features are implementechoice4: ' The benefits of this include ______.",
                            choice1: ' It makes CE configuration easier.',
                            choice2: ' It allows for very scalable VPN solutions.',
                            choice3: ' It lowers CE management overhead.',
                            choice4: ' All of the above',
                            answer: 4,
                            },							
                            {
                            question:
                            "15. The relationship between LDP and an IGP is best described as.",
                            choice1: ' LDP paths are preferred over IGP routes.',
                            choice2: ' LDP uses IGP next-hop information.',
                            choice3: ' LDP re-distributes labels into IGP.',
                            choice4: ' IGP tags network destinations with LDP information',
                            answer: 2,
                        
                        
                        
                            }




        ]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 200

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