
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  CircleQuestionMark,
  Clock4,
  Hand,
  Headset,
  Mail,
  Phone,
  Plus,
  ShieldCheck,
  Ticket,
  Globe,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const HelpNSupport = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How do I create a support ticket?",
      answer:
        "Go to the Create Ticket page, enter the required details about your issue, select the appropriate category and priority, and click Submit.",
    },
    {
      question: "How can I check my ticket status?",
      answer:
        "You can view all your submitted tickets from the My Tickets section. Each ticket shows its current status, priority, and latest update.",
    },
    {
      question: "How long does it take to resolve a ticket?",
      answer:
        "Resolution time depends on the complexity and priority of the issue.",
    },
    {
      question: "What information should I include in a ticket?",
      answer:
        "Provide a clear description of the issue and relevant error messages.",
    },
    {
      question: "Can I update an existing ticket?",
      answer:
        "Yes. You can add additional information or comments to an open ticket.",
    },
    {
      question: "What should I do if my issue is urgent?",
      answer:
        "Select a higher priority when creating your ticket or contact the support team directly.",
    },
  ];

  const resources = [
    {
      title: "Knowledge Base",
      description:
        "Find quick solutions, troubleshooting guides, and answers to common issues.",
      action: "Browse Articles",
      Icon: BookOpen,
      iconClass: "bg-violet-200 text-violet-700",
      hoverClass: "hover:border-violet-300 hover:bg-violet-100",
      onClick: () => navigate("/user/knowledge-base"),
    },
    {
      title: "Frequently Asked Questions",
      description:
        "Find answers to the most common questions about tickets and support.",
      action: "View FAQs",
      Icon: CircleHelp,
      iconClass: "bg-sky-200 text-sky-700",
      hoverClass: "hover:border-sky-300 hover:bg-sky-100",
      onClick: () =>
        document.getElementById("support-faq")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
    },
    {
      title: "My Tickets",
      description:
        "View your submitted tickets, check their status, and follow recent updates.",
      action: "View Tickets",
      Icon: Ticket,
      iconClass: "bg-green-200 text-green-700",
      hoverClass: "hover:border-green-300 hover:bg-green-100",
      onClick: () => navigate("/user/my-tickets"),
    },
    {
      title: "Support Guidelines",
      description:
        "Learn how to create effective tickets and provide the information our team needs.",
      action: "Create a Ticket",
      Icon: ShieldCheck,
      iconClass: "bg-orange-200 text-orange-700",
      hoverClass: "hover:border-orange-300 hover:bg-orange-100",
      onClick: () => navigate("/user/create-ticket"),
    },
  ];

  return (
    <div className="flex w-full flex-col gap-5 bg-gray-200 dark:bg-zinc-950 p-4">
  {/* Breadcrumb */}
  <div className="flex items-center gap-1 text-sm">
    <span className="text-gray-600 dark:text-zinc-400">Dashboard</span>
    <ChevronRight size={17} className="text-gray-400 dark:text-zinc-500" />
    <span className="font-semibold text-gray-800 dark:text-gray-100">
      Help & Support
    </span>
  </div>

  {/* Hero Section */}
  <div className="flex  items-center overflow-hidden rounded-xl border border-violet-200 dark:border-zinc-800 bg-linear-to-br from-violet-300 to-indigo-400 dark:from-indigo-900/50 dark:to-violet-500/70 p-4">

    <div className="flex w-1/2 flex-col items-start gap-3">
      <h1 className="flex items-center gap-2  md:xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 xl:text-3xl">
        We're Here to Help You!
        <Hand size={25} className="shrink-0 text-amber-500" />
      </h1>

      <p className="text-xs md:text-sm leading-6 text-gray-700 dark:text-zinc-300">
        If you need assistance, our support team is always ready to help.
      </p>

      <button
        type="button"
        onClick={() => navigate("/user/create-ticket")}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border hover:border-blue-800 hover:bg-blue-700 px-2 md:px-4 py-1 md:py-2 text-sm font-semibold text-white transition duration-200 border-violet-800 bg-violet-700"
      >
        <Plus size={19} className="hidden md:block"/>
        Create A Ticket
      </button>
    </div>

    <div className="flex w-1/2 justify-center">
      <img
        src="/headphone.png"
        alt="Customer support"
        className=" md:h-30 md:w-50 object-contain"
      />
    </div>
  </div>

  {/* Contact Support */}
  <section>
    <div className="mb-3">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        Contact Support
      </h2>
      <p className="mt-1 text-sm text-gray-600 dark:text-zinc-400">
        Choose the best way to reach us.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
      {/* Live Chat */}
      <div className="flex min-w-0 flex-col items-center gap-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 p-4 text-center transition-all duration-300 hover:scale-[1.02]  dark:hover:border-violet-500 hover:border-violet-500  dark:hover:bg-violet-950/10">
        <Headset
          size={48}
          className="rounded-full bg-violet-200 dark:bg-violet-900 p-2.5 text-violet-700 dark:text-violet-300"
        />

        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Live Chat
        </h3>

        <p className="text-sm leading-5 text-gray-600 dark:text-zinc-400">
          Chat with our support team in real time.
        </p>

        <button
          type="button"
          className="w-full cursor-pointer rounded-lg border border-violet-600 px-4 py-2 text-sm font-semibold text-violet-700 dark:text-violet-300 transition hover:bg-violet-600 hover:text-white"
        >
          Start Chat
        </button>

        <p className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-zinc-400">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
          Available Now
        </p>
      </div>

      {/* Email Support */}
      <div className="flex min-w-0 flex-col items-center gap-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 p-4 text-center transition-all duration-300 hover:scale-[1.02] hover:border-sky-500 dark:hover:border-sky-500  dark:hover:bg-sky-950/10">
        <Mail
          size={48}
          className="rounded-full bg-sky-200 dark:bg-sky-900 p-2.5 text-sky-700 dark:text-sky-300"
        />

        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Email Support
        </h3>

        <p className="text-sm leading-5 text-gray-600 dark:text-zinc-400">
          Send us an email and our support team will get back to you as soon as
          possible.
        </p>

        <a
          href="mailto:support@smart-support.com"
          className="flex w-full items-center justify-center rounded-lg border border-sky-600 px-2 py-2 text-sm font-semibold text-sky-700 dark:text-sky-300 transition hover:bg-sky-600 hover:text-white"
        >
          support@smart-support.com
        </a>

        <p className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-zinc-400">
          <Clock4 size={15} />
          Usually replies within 24 hours
        </p>
      </div>

      {/* Phone Support */}
      <div className="flex min-w-0 flex-col items-center gap-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 p-4 text-center transition-all duration-300 hover:scale-[1.02] hover:border-green-500 dark:hover:border-green-500  dark:hover:bg-green-950/10">
        <Phone
          size={48}
          className="rounded-full bg-green-200 dark:bg-green-900 p-2.5 text-green-700 dark:text-green-300"
        />

        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Phone Support
        </h3>

        <p className="text-sm leading-5 text-gray-600 dark:text-zinc-400">
          Need immediate assistance? Call our support team and we'll help you
          resolve your issue.
        </p>

        <a
          href="tel:18001147412"
          className="flex w-full items-center justify-center rounded-lg border border-green-600 px-4 py-2 text-sm font-semibold text-green-700 dark:text-green-300 transition hover:bg-green-600 hover:text-white"
        >
          1800 114 7412
        </a>

        <p className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-zinc-400">
          <Clock4 size={15} />
          Monday – Friday, 9:00 AM – 6:00 PM
        </p>
      </div>
    </div>
  </section>

  {/* FAQs */}
  <section id="support-faq" className="scroll-mt-4">
    <div className="mb-3">
      <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-gray-100">
        <CircleQuestionMark
          size={38}
          className="rounded-lg bg-violet-200 dark:bg-violet-900 p-2 text-violet-700 dark:text-violet-300"
        />
        Got Questions? We've Got Answers.
      </h2>

      <p className="mt-2 text-sm text-gray-600 dark:text-zinc-400">
        Find answers to common questions and learn how to get the most out of
        our support system.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
      {faqs.map((faq, index) => (
        <details
          key={faq.question}
          className="group rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 p-3 transition-all duration-200 hover:border-violet-500 dark:hover:border-violet-900 hover:bg-violet-50 dark:hover:bg-violet-900/10"
        >
          <summary className="flex cursor-pointer list-none items-center gap-3">
            <span className="flex h-8 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-200 dark:bg-violet-900 text-sm font-bold text-violet-700 dark:text-violet-300">
              {String(index + 1).padStart(2, "0")}.
            </span>

            <span className="flex-1 text-sm font-semibold text-gray-800 dark:text-gray-100">
              {faq.question}
            </span>

            <ChevronDown
              size={18}
              className="shrink-0 text-violet-700 dark:text-violet-300 transition-transform duration-200 group-open:rotate-180"
            />
          </summary>

          <p className="mt-3 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 p-3 text-sm leading-6 text-gray-600 dark:text-zinc-300">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  </section>

  {/* Need More Help */}
  <div className="flex items-center gap-2 overflow-hidden rounded-xl border border-violet-200 dark:border-zinc-800 bg-linear-to-br from-violet-300 to-indigo-400 dark:from-indigo-900/50 dark:to-violet-500/70 p-4">
    <div className="flex w-1/3 justify-center">
      <img
        src="/headphone.png"
        alt="Support assistance"
        className="h-27.5 w-40 object-contain"
      />
    </div>

    <div className="flex w-2/3 flex-col items-start gap-2">
      <h2 className=" md:text-lg font-bold text-gray-900 dark:text-gray-100">
        Still can't find what you're looking for?
      </h2>

      <p className="text-xs md:text-sm leading-5 text-gray-700 dark:text-zinc-300">
        Our support team is ready to help. Create a ticket and we'll get back to
        you with the right solution.
      </p>

      <button
        type="button"
        onClick={() => navigate("/user/create-ticket")}
        className="mt-1 flex cursor-pointer items-center gap-2 rounded-lg border hover:border-blue-800 hover:bg-blue-700 px-2 lg:px-4 py-1 lg:py-2 text-sm font-semibold text-white transition duration-200 border-violet-800 bg-violet-700"
      >
        <Plus size={18} className="hidden lg:block"/>
        Create A Ticket
      </button>
    </div>
  </div>

  {/* Additional Resources */}
  <section>
  <div className="mb-3">
    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
      Additional Resources
    </h2>
    <p className="mt-1 text-sm text-gray-600 dark:text-zinc-400">
      Helpful resources to get you the help you need.
    </p>
  </div>

  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
    {resources.map(
      ({ title, description, action, Icon, iconClass, hoverClass, onClick }) => (
        <div
          key={title}
          className={`flex min-w-0 flex-col items-start gap-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 p-4 transition-all duration-300 ease-in-out hover:scale-[1.02] ${hoverClass} dark:hover:border-violet-500 dark:hover:bg-zinc-800`}
        >
          <Icon
            size={46}
            className={`rounded-xl p-2.5 ${iconClass}`}
          />

          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h3>

          <p className="flex-1 text-sm leading-5 text-gray-600 dark:text-zinc-400">
            {description}
          </p>

          <button
            type="button"
            onClick={onClick}
            className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-violet-700 dark:text-violet-300 transition hover:text-gray-900 dark:hover:text-gray-100"
          >
            {action}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      ),
    )}
  </div>
</section>
</div>
  );
};

export default HelpNSupport;