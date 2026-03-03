import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Home, 
  Stethoscope, 
  CreditCard, 
  FileSignature, 
  CheckCircle, 
  User, 
  FileUp, 
  ShieldCheck,
  AlertCircle,
  FileBadge,
  Banknote,
  BriefcaseMedical,
  Leaf,
  Shield,
  Award,
  Globe,
  Phone,
  Mail,
  MapPin,
  Info
} from 'lucide-react';

const FileUpload = ({ label, id, icon: Icon, required = false, description = '' }: { label: string, id: string, icon: any, required?: boolean, description?: string }) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-slate-800 flex items-center gap-2">
        <Icon className="w-4 h-4 text-amber-600" />
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && <p className="text-xs text-slate-500 mb-1">{description}</p>}
      <div className="relative group">
        <input
          type="file"
          id={id}
          className="hidden"
          onChange={handleFileChange}
          required={required}
        />
        <label
          htmlFor={id}
          className={`flex items-center justify-center w-full px-4 py-4 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
            fileName 
              ? 'border-amber-500 bg-amber-50/50 hover:bg-amber-50' 
              : 'border-slate-300 hover:border-amber-400 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            {fileName ? (
              <>
                <CheckCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="text-sm text-amber-700 font-medium truncate max-w-[200px] sm:max-w-[300px]">{fileName}</span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors shrink-0" />
                <span className="text-sm text-slate-500 group-hover:text-amber-600 transition-colors">Clique para selecionar ou arraste o arquivo</span>
              </>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

export default function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-4">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Documentação Enviada!</h2>
          <p className="text-slate-600">
            Seus documentos foram recebidos com sucesso. Nossa equipe fará a análise e entrará em contato em breve.
          </p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="mt-6 w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors"
          >
            Enviar novo cadastro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-slate-900 pb-20">
      {/* Header with Background Image */}
      <header className="relative h-auto sm:h-[580px] w-full overflow-hidden pb-16 sm:pb-0">
        <div className="absolute inset-0">
          <img 
            src="/images/nano_banana.png" 
            alt="Laboratório CBD Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-900/90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center pt-12 sm:pt-20">
          <div className="mb-8">
            <div className="inline-block bg-white p-4 rounded-2xl shadow-2xl">
              <img 
                src="https://static.wixstatic.com/media/0059f9_2d6a863718e64a989d506cc12767b9c6~mv2.jpg/v1/fill/w_200,h_142,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Captura%20de%20tela%202025-07-11%20125713_edited.jpg" 
                alt="Logo da Empresa" 
                className="h-20 sm:h-24 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-md">
            Cadastro de Paciente – DesertMoon Brasil
          </h2>
          <p className="text-amber-100 max-w-2xl text-lg sm:text-xl mb-10 drop-shadow">
            Preencha o formulário abaixo com seus dados e documentos para iniciar o seu tratamento com CBD de forma segura e legal no Brasil.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl w-full text-left">
            <div className="flex items-start gap-3 bg-slate-900/60 backdrop-blur-md p-5 rounded-xl border border-white/10 shadow-lg">
              <Shield className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-sm text-white font-medium">Produção com Boas Práticas de Fabricação (GMP)</p>
            </div>
            <div className="flex items-start gap-3 bg-slate-900/60 backdrop-blur-md p-5 rounded-xl border border-white/10 shadow-lg">
              <Award className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-sm text-white font-medium">Certificados de Análise (COAs) disponíveis para todos os lotes</p>
            </div>
            <div className="flex items-start gap-3 bg-slate-900/60 backdrop-blur-md p-5 rounded-xl border border-white/10 shadow-lg">
              <Globe className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-sm text-white font-medium">Rastreamento completo da origem ao destino</p>
            </div>
            <div className="flex items-start gap-3 bg-slate-900/60 backdrop-blur-md p-5 rounded-xl border border-white/10 shadow-lg">
              <Leaf className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-sm text-white font-medium">Compromisso com sustentabilidade e respeito ao meio ambiente</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:-mt-12 relative z-20">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          
          <div className="p-6 sm:p-10 space-y-12">
            
            {/* Section 1: Documentos Pessoais */}
            <section>
              <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Documentos Pessoais</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="patientName" className="block text-sm font-semibold text-slate-800 mb-1">Nome Completo do Paciente *</label>
                    <input type="text" id="patientName" required className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" placeholder="Ex: João da Silva" />
                  </div>
                  <FileUpload 
                    id="docPatient" 
                    label="RG e CPF do Paciente" 
                    icon={FileBadge} 
                    required 
                    description="Cópia legível frente e verso."
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="respName" className="block text-sm font-semibold text-slate-800 mb-1">Nome do Responsável (se houver)</label>
                    <input type="text" id="respName" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" placeholder="Ex: Maria da Silva" />
                  </div>
                  <FileUpload 
                    id="docResp" 
                    label="RG e CPF do Responsável" 
                    icon={FileBadge} 
                    description="Apenas se o paciente for menor ou incapaz."
                  />
                </div>

                <div className="md:col-span-2">
                  <FileUpload 
                    id="docAddress" 
                    label="Comprovante de Residência Atualizado" 
                    icon={Home} 
                    required 
                    description="Conta de água, luz, telefone ou internet (máximo 3 meses)."
                  />
                </div>
              </div>
            </section>

            {/* Section 2: Documentação Médica */}
            <section>
              <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-6">
                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Documentação Médica</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FileUpload 
                  id="docPrescription" 
                  label="Receita Médica Válida" 
                  icon={FileText} 
                  required 
                  description="Receita original, carimbada e assinada pelo médico."
                />
                <FileUpload 
                  id="docReport" 
                  label="Laudo Médico Detalhado" 
                  icon={FileText} 
                  required 
                  description="Deve conter CID, justificativa do uso e indicação do medicamento."
                />
              </div>
            </section>

            {/* Section 3: Comprovação Financeira */}
            <section>
              <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-6">
                <div className="p-2 bg-amber-100 rounded-lg text-amber-700">
                  <Banknote className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Comprovação Financeira</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FileUpload 
                  id="docBank" 
                  label="Extratos Bancários" 
                  icon={CreditCard} 
                  required 
                  description="Extratos dos últimos 3 meses de todas as contas."
                />
                <FileUpload 
                  id="docDeclaration" 
                  label="Declaração de Hipossuficiência" 
                  icon={FileSignature} 
                  required 
                  description="Documento assinado declarando incapacidade financeira."
                />
              </div>
            </section>

            {/* Section 4: Documentos Administrativos */}
            <section>
              <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg text-purple-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Documentos Administrativos</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FileUpload 
                  id="docAnvisaAuth" 
                  label="Autorização da Anvisa" 
                  icon={CheckCircle} 
                  required 
                  description="Autorização de importação emitida pela Anvisa."
                />
                <FileUpload 
                  id="docAnvisaProc" 
                  label="Procuração da Anvisa" 
                  icon={FileSignature} 
                  required 
                  description="Procuração devidamente assinada pelo paciente/responsável."
                />
              </div>
            </section>

          </div>

          {/* Form Actions */}
          <div className="bg-slate-50 p-6 sm:p-10 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Todos os campos com * são obrigatórios.
            </p>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold rounded-xl shadow-lg shadow-slate-900/20 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <FileUp className="w-5 h-5" />
                  Enviar Documentação
                </>
              )}
            </button>
          </div>

        </form>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pb-8">
        <div className="bg-slate-900 text-slate-300 rounded-2xl p-8 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-amber-500" />
                Aviso Legal
              </h4>
              <p className="text-sm leading-relaxed text-slate-400">
                Os produtos Desert Moon CBD não são comercializados em território brasileiro. As aquisições são realizadas nos Estados Unidos, e a importação ocorre exclusivamente no CPF do paciente, conforme <strong className="text-slate-200">Resolução RDC nº 660, de 30 de março de 2022</strong>. A Desert Moon CBD Brasil presta apenas serviços administrativos e de suporte ao processo de importação.
              </p>
              <a href="https://www.gov.br/anvisa/pt-br/centraisdeconteudo/publicacoes/medicamentos/controlados/nota-tecnica-39-de-2021-produtos-cannabis" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-xs text-amber-500 hover:text-amber-400 underline underline-offset-2">
                NOTA TÉCNICA Nº 76/2025/SEI/COCIC/GPCON/DIRE5/ANVISA
              </a>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Contato</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <a href="https://wa.me/17603300145" className="hover:text-white transition-colors">+1 760 330 0145</a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <a href="mailto:desertmooncbd@gmail.com" className="hover:text-white transition-colors">desertmooncbd@gmail.com</a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>AVENIDA DAS AMERICAS, 4200, BL 1 SALA 305<br/>BARRA DA TIJUCA, RIO DE JANEIRO, RJ<br/>CEP 22.640-907</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© Copyright DesertMoon CBD Brasil © 2025 – Todos os direitos reservados.</p>
            <div className="flex gap-4">
              <a href="https://www.desertmooncbdbrasil.com.br/termos-e-condi%C3%A7%C3%B5es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">Termos e Condições</a>
              <a href="https://www.desertmooncbdbrasil.com.br/pol%C3%ADtica-de-privacidade" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">Política de Privacidade</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
