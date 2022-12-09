import { Dialog, Transition } from "@headlessui/react";
import {
  useState,
  Fragment,
  useContext,
  cloneElement,
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";

type ModalContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

/**
 * helper function to call all callback fns passed to modal
 */
const callAll =
  (...fns: any) =>
  (...args: any) =>
    fns.forEach((fn: any) => fn && fn(...args));

/**
 * Modal Context & useModalContext hook
 *
 */
const ModalContext = createContext<ModalContextType | undefined>(undefined);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useTodoContext must be within TodoProvider");
  }
  return context;
};

/**
 * Compound modal component
 * uses modal context values to sync states between.
 */

const Modal = (props: { children: JSX.Element[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  return <ModalContext.Provider value={{ isOpen, setIsOpen }} {...props} />;
};

const ModalDismissButton = ({ children: child }: { children: JSX.Element }) => {
  const { setIsOpen } = useModalContext();
  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  });
};

const ModalOpenButton = ({ children: child }: { children: JSX.Element }) => {
  const { setIsOpen } = useModalContext();
  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  });
};

const BackDrop = () => {
  return (
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-black bg-opacity-25" />
    </Transition.Child>
  );
};

const ModalContents = ({
  title,
  children,
  onClose,
}: {
  title: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  children: React.ReactNode;
  onClose?: () => void;
}) => {
  const { isOpen, setIsOpen } = useModalContext();
  const closeModal = callAll(() => setIsOpen(false), onClose);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={closeModal}>
          <BackDrop />

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`w-full max-w-2xl transform overflow-scroll rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>

                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export { Modal, ModalDismissButton, ModalOpenButton, ModalContents };
